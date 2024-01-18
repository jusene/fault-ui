import { IForm } from "@/base-ui/form";

export const FormConfig: IForm = {
  labelWidth: "120px",
  colLayout: {
    span: 24,
  },
  formItems: [
    {
      field: "description",
      type: "input",
      label: "事件原因",
      placeholder: "请输入事件原因",
      otheroptions: {
        autosize: false,
        type: "textarea",
      },
    },
    {
      field: "remark",
      type: "input",
      label: "解决方法",
      placeholder: "请输入解决方法",
      otheroptions: {
        autosize: false,
        type: "textarea",
      },
    },
  ],
  itemStyle: {
    padding: "1px 20px",
  },
};
