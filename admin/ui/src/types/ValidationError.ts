type ErrorType = 'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max' | 'email' | 'url';
export interface ValidationError {
  type: ErrorType;
}
