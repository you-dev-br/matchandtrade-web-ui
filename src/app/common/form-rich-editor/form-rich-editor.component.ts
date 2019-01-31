import { Component, Input, OnInit, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

// TODO: Import instead of declaring. Also import only relevant Quill modules.
// Currently we get an error when importing: node_modules/@types/quill/node_modules/quill-delta/dist/Delta.d.ts(1,8): error TS1192
declare const Quill: any;

@Component({
  selector: 'app-form-rich-editor',
  templateUrl: './form-rich-editor.component.html',
  styleUrls: ['./form-rich-editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormRichEditorComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FormRichEditorComponent),
    multi: true,
  }]
})
export class FormRichEditorComponent implements OnInit, ControlValueAccessor, Validator {


  @ViewChild('editorElement', {read: ElementRef})
  editorElement: ElementRef;
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
    this.editor = new Quill(this.editorElement.nativeElement, {theme: 'snow'});
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
