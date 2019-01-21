import { AfterViewChecked, Component, Input, OnInit, AfterViewInit, ViewChild, OnChanges, ViewContainerRef } from '@angular/core';

declare const require: any;
const Jodit: any = require('jodit');

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements AfterViewInit {
  @ViewChild('editorView', { read: ViewContainerRef })
  private editorView: ViewContainerRef;
  @Input()
  initialValue: string;
  private jodit: any;
  @Input()
  label: string;
  @Input()
  readOnly: boolean;
  @Input()
  required: boolean = false;

  private joditConfig = {
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    buttons:   "bold,strikethrough,eraser,|,ul,ol,|,outdent,indent,|,paragraph,|,link,|,align,,selectall,fullsize",
    buttonsMD: "bold,strikethrough,eraser,|,ul,ol,|,outdent,indent,|,paragraph,|,link,|,align,,selectall,fullsize",
    buttonsSM: "bold,strikethrough,eraser,|,ul,ol,|,outdent,indent,|,paragraph,|,link,|,align,,selectall,fullsize",
    buttonsXS: "bold,strikethrough,eraser,|,paragraph,|,align,|,fullsize,|,dots",
    defaultActionOnPaste: "insert_only_text",
    disablePlugins: "color,iframe,imageProcessor,imageProperties,inlinePopup,justify,media",
    readonly: true,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    spellcheck: false,
    toolbar: false,
    toolbarInline: false,
    toolbarButtonSize: "large",
    toolbarSticky: false,
    toolbarStickyOffset: 20,
  };

  /**
   * Strangely, simply setting 'textEditorView: JoditAngularComponent' throws error.
   * Alternatively, hence we cast 'textEditorView: any' to 'textEditorViewJodit: JoditAngularComponent'
   */
  ngAfterViewInit(): void {
    this.joditConfig.readonly = this.readOnly;
    this.joditConfig.toolbar = !this.readOnly;
    this.jodit = new Jodit(this.editorView.element.nativeElement, this.joditConfig);
    this.setValue(this.initialValue);
  }

  getValue(): string {
    return this.jodit.getEditorValue();
  }

  setValue(v: string): void {
    this.jodit.setEditorValue(v);
  }

  private requiredString(): string {
    return this.required ? '*' : '';
  }
}
