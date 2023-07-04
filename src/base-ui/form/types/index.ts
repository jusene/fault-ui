type IFormType =
  | "input"
  | "password"
  | "select"
  | "datepicker"
  | "number"
  | "slot"
  | "input-number";

export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: any;
  // 针对select
  options?: any[];
  // 针对特殊属性
  otheroptions?: any;
  default?: any;
  isHidden?: boolean;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemStyle: any;
  rules?: any;
}
