import { Component, Input, OnInit, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

// TODO: Import instead of declaring. Also import only relevant Quill modules.
// Currently we get an error when importing: node_modules/@types/quill/node_modules/quill-delta/dist/Delta.d.ts(1,8): error TS1192
declare const Quill: any;

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextEditorComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => TextEditorComponent),
    multi: true,
  }]
})
export class TextEditorComponent implements OnInit, ControlValueAccessor, Validator {
  @ViewChild('editorElement', {read: ElementRef})
  editorElement: ElementRef;
  @ViewChild('editorContainer', {read: ElementRef})
  editorContainerElementRef: ElementRef;
  editor: any;
  @Input()
  value: string;
  @Input()
  minLength: number;
  @Input()
  maxLength: number;

  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit(): void {
    const toolbarOptions = [
      ['bold', 'italic', 'strike'],
      [{ 'align': [false, 'center'] }, 'link'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, 'code-block'],    
      ['clean']
    ];

    const formatOptions = ['bold', 'italic', 'strike', 'align', 'link', 'list', 'indent', 'size', 'color', 'code-block'];
    let options = {
      theme: 'snow',
      formats: formatOptions,
      modules: {
        toolbar: toolbarOptions
      }
    };

    this.editor = new Quill(this.editorElement.nativeElement, options);
    this.editor.on('text-change', () => {
      const editorContent = JSON.stringify(this.editor.getContents());
      this.onChange(editorContent);
    });
  }

  getText(): string {
    return this.editor.getText();
  }

  registerOnChange(fn: (v: any) => void): void {
     this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.editor.enable(!disabled);
    const editorContainerNativeElement: HTMLElement = this.editorContainerElementRef.nativeElement;
    const toolbarNativeElement = editorContainerNativeElement.getElementsByClassName('ql-toolbar')[0];
    if (disabled) {
      editorContainerNativeElement.classList.add('text-editor-disabled')
      toolbarNativeElement.classList.add('mt-hide');
    } else {
      editorContainerNativeElement.classList.remove('text-editor-disabled')
      toolbarNativeElement.classList.remove('mt-hide');
    }
  }

  validate(control: AbstractControl): ValidationErrors {
    if (this.minLength && this.editor.getText().trim().length < this.minLength) {
      return {'minLength': true};
    }
    if (this.maxLength && this.editor.getText().trim().length > this.maxLength) {
      return {'maxLength': true};
    }
    return null;
  }

  writeValue(deltaString: string): void {
    if (deltaString && deltaString.length > 0) {
      this.value = this.editor.setContents(JSON.parse(deltaString));
    }
  }
}
