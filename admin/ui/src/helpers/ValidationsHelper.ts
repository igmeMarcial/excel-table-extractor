import { ValidationErrors, Validators } from "../core/Validators";
import { FieldDef } from "../pages/indicadores/editor/EstadisticaFieldsDef";

export class ValidationsHelper {

  private static _instance: ValidationsHelper;

  public static getInstance() {
    if (!ValidationsHelper._instance) {
      ValidationsHelper._instance = new ValidationsHelper();
    }
    return ValidationsHelper._instance;
  }
  validValues(fieldDefs: { [key: string]: FieldDef }, values: any): boolean {
    values = values || {};
    return Object.keys(fieldDefs).every((fieldName) => {
      const fieldDef = fieldDefs[fieldName];
      const value = values[fieldName];
      return this.getFieldErrors(fieldDef, value) === null;
    });
  }
  /**
   * Incorpora o elimina los errores de validación de un campo en el objeto de errores
   * @param fieldDef
   * @param fieldName
   * @param value
   * @param currentErrors
   * @returns
   */
  getGroupValidationErrorsWith(fieldDef: FieldDef, fieldName, value, currentErrors) {
    const fieldErrors = this.getFieldErrors(fieldDef, value);
    if (fieldErrors) {
      return { ...currentErrors, [fieldName]: fieldErrors };
    }
    // Remove the field from the errors object
    const { [fieldName]: _, ...rest } = currentErrors;
    return rest;
  }
  getFieldErrors(fieldDef: FieldDef, value: string): ValidationErrors {
    if (!fieldDef) {
      return null;
    }
    let errors: ValidationErrors = null;
    // Required validation
    // TODO : Implementar demás validaciones
    if (fieldDef.required) {
      errors = Validators.required(value);
    }
    fieldDef.customValidators?.forEach((validator) => {
      const error = validator(value);
      if (error) {
        errors = { ...errors, ...error };
      }
    });
    return errors;
  }
  hasError(errortype: string, errors: ValidationErrors): boolean {
    return errors?.[errortype];
  }
}

export default ValidationsHelper.getInstance();
