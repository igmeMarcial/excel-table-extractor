import { FieldValidation } from "../types/FieldValidation";
import { ValidationError } from "../types/ValidationError";

export class FieldValidationsHelper {

  private static _instance: FieldValidationsHelper;

  public static getInstance() {
    if (!FieldValidationsHelper._instance) {
      FieldValidationsHelper._instance = new FieldValidationsHelper();
    }
    return FieldValidationsHelper._instance;
  }
  // TODO : Implementar demás validaciones
  getFieldErrors(value: string, validations: FieldValidation): ValidationError[] {
    if (!validations) {
      return null;
    }
    const errors: ValidationError[] = [];
    if (validations.required && !value) {
      errors.push({ type: 'required' });
    }
    return errors.length ? errors : null;
  }
  hasError(errortype: string, errors: ValidationError[]): boolean {
    if (!errors) {
      return false;
    }
    return errors.some((error) => error.type === errortype);
  }
}

export default FieldValidationsHelper.getInstance();
