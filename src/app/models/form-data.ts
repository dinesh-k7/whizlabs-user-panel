export interface IFormData {
  controlName: string;
  controlType: string;
  valueType?: string;
  currentValue?: string;
  label?: string;
  placeholder?: string;
  options?: Array<{
    optionName: string;
    value: string;
  }>;
  validators?: {
    required?: boolean;
    minlength?: number;
    maxlength?: number;
  };
}
