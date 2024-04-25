/**
 * Inspirada en la librería de validación de formularios de Angular.
 */
export type ValidationErrors = {
  [key: string]: any;
};
/**
 * @description
 * A function that receives a control and synchronously returns a map of
 * validation errors if present, otherwise null.
 *
 * @publicApi
 */
export interface ValidatorFn {
  (value): ValidationErrors | null;
}
/**
 * Clase con métodos de validación de campos de formularios.
 */
export class Validators {
  static required(value: any): ValidationErrors {
    return isEmptyInputValue(value) ? { required: true } : null;
  }
  static email(value: any): ValidationErrors {
    if (isEmptyInputValue(value)) {
      return null;
    }
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailRegex.test(value) ? null : { email: true };
  }
  static minLength(minLength: number) {
    return (value: any): ValidationErrors => {
      return isEmptyInputValue(value) || value.length >= minLength ? null : { minLength: { requiredLength: minLength, actualLength: value.length } };
    };
  }
  static maxLength(maxLength: number) {
    return (value: any): ValidationErrors => {
      return isEmptyInputValue(value) || value.length <= maxLength ? null : { maxLength: { requiredLength: maxLength, actualLength: value.length } };
    };
  }
  static nullValidator(value: any): ValidationErrors {
    return null;
  }
  static min(min: number) {
    return (value: any): ValidationErrors => {
      return isEmptyInputValue(value) || +value >= min ? null : { min: { min: min, actual: value } };
    };
  }
  static max(max: number) {
    return (value: any): ValidationErrors => {
      return isEmptyInputValue(value) || +value <= max ? null : { max: { max: max, actual: value } };
    };
  }
  static pattern(pattern: string | RegExp) {
    if (!pattern) {
      return Validators.nullValidator;
    }
    let regex: RegExp;
    let regexStr: string;
    if (typeof pattern === 'string') {
      regexStr = '';
      if (pattern.charAt(0) !== '^') {
        regexStr += '^';
      }
      regexStr += pattern;
      if (pattern.charAt(pattern.length - 1) !== '$') {
        regexStr += '$';
      }
      regex = new RegExp(regexStr);
    } else {
      regexStr = pattern.toString();
      regex = pattern;
    }
    return (value: any): ValidationErrors => {
      return isEmptyInputValue(value) || regex.test(value) ? null : { pattern: { requiredPattern: regexStr, actualValue: value } };
    };
  }
}

/**
 * @param value Valor a evaluar.
 * @returns Verdadero si el valor es nulo, indefinido, una cadena vacía o un arreglo vacío.
 */
function isEmptyInputValue(value: any): boolean {
  return (
    value == null || ((typeof value === 'string' || Array.isArray(value)) && value.length === 0)
  );
}
