import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class ValidatorUtil {

	private static isEmpty(value: any): boolean {
		if (value == null) {
			return true;
		} else if (this.isString(value)) {
			return value.trim().length == 0;
		} else {
			return value.length == 0;
		}
	}

	private static isString(value: any): boolean {
		return typeof value === 'string';
	}

	static minLengthWithTrim(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
			let value = control.value;
      if (this.isEmpty(value)) {
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
      if (this.isEmpty(value)) {
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
