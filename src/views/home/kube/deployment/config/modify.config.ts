import { IForm } from "@/base-ui/form";

export const modifyFormConfig: IForm = {
  labelWidth: "120px",
  colLayout: {
    span: 24,
  },
  formItems: [
    {
      field: "replicas",
      type: "number",
      label: "副本数",
      placeholder: "请输入副本数",
    },
  ],
  itemStyle: {
    padding: "5px 20px",
  },
};
