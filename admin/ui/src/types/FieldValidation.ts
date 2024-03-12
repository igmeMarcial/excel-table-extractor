type VType = 'email' | 'url';
type Status = 'error' | 'warning'
export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
  vtype?: VType;
  state?: Status;
}
