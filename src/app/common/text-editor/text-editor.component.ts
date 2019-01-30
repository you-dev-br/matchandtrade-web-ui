import { Component, Input, ViewChild, OnDestroy, OnChanges, OnInit, ViewContainerRef, SimpleChanges} from '@angular/core';

// TODO: Migrate to import when Jodit fixes their export
declare const Jodit: any;

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  content: string;
  @ViewChild('editorView', { read: ViewContainerRef })
  private editorView: ViewContainerRef;
  private jodit: any;
  @Input()
  label: string;
  @Input()
  readOnly: boolean = true;
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

  ngOnInit(): void {
    this.joditConfig.readonly = this.readOnly;
    this.joditConfig.toolbar = !this.readOnly;
    this.jodit = new Jodit(this.editorView.element.nativeElement, this.joditConfig);
    this.setValue(this.content);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.jodit) {
      this.content = String(changes.content.currentValue);
      this.setValue(this.content);
    }
  }

  ngOnDestroy(): void {
    // TODO: Follow up on https://github.com/xdan/jodit/issues/137
    this.jodit = undefined;
  }

  classInputField(): string {
    return this.readOnly ? 'inputfield-borderless' : 'inputfield-border';
  }

  getValue(): string {
    return this.jodit.getEditorValue();
  }

  requiredString(): string {
    return this.required ? '*' : undefined;
  }

  setValue(v: string): void {
    this.jodit.setEditorValue(v);
  }

  showLabel(): boolean {
    return !!this.label;
  }
}
