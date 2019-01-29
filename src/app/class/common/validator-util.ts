import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class ValidatorUtil {

	private static isEmptyInputValue(value: any): boolean {
		// we don't check for string here so it also works with arrays
		return value == null || value.length === 0;
	}

	private static isString(value: any): boolean {
		return typeof value === 'string';
	}

	static minLengthWithTrim(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
			let value = control.value;
      if (this.isEmptyInputValue(value)) {
        return null;  // don't validate empty values to allow optional controls
			}
			
			if (this.isString(value)) {
				value = value.trim();
			}

      let length = this.obtainLength(value);
      return length < minLength ?
          {'minlength': {'requiredLength': minLength, 'actualLength': length}} :
          null;
    };
	}

	static maxLengthWithTrim(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
			let value = control.value;
      if (this.isEmptyInputValue(value)) {
        return null;  // don't validate empty values to allow optional controls
			}
			
			if (this.isString(value)) {
				value = value.trim();
			}

      let length = this.obtainLength(value);
      return length > maxLength ?
          {'maxlength': {'requiredLength': maxLength, 'actualLength': length}} :
          null;
    };
	}

	private static obtainLength(value: any): any {
		return value ? value.length : 0;
	}
}
