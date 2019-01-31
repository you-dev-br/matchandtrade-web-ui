import { Component, Input, OnInit, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

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
  }]
})
export class FormRichEditorComponent implements OnInit, ControlValueAccessor {
  @ViewChild('editorElement', {read: ElementRef})
  editorElement: ElementRef;
  editor: any;
  @Input()
  value: any;

  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit(): void {
    this.editor = new Quill(this.editorElement.nativeElement, {theme: 'snow'});
    this.editor.on('text-change', () => {
      const editorContent = JSON.stringify(this.editor.getContents());
      this.onChange(editorContent);
    });
  }

  registerOnChange(fn: (v: any) => void): void {
     this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(deltaString: string): void {
    if (deltaString && deltaString.length > 0) {
      this.value = this.editor.setContents(JSON.parse(deltaString));
    }
  }
}
