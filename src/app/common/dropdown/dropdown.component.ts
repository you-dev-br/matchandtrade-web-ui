import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  formGroup: FormGroup;
  @Output()
  onChange = new EventEmitter<string>();
  valueControl: AbstractControl;
  @Input()
  values: KeyValue<string, string>[];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      'value': []
    });
    this.valueControl = this.formGroup.controls['value'];
  }

  onChangeEvent(): void {
    this.onChange.emit(this.valueControl.value);
  }
}
