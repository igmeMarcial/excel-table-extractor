type ErrorType = 'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max' | 'email' | 'url' | 'error';
export interface ValidationError {
  type: ErrorType;
}
