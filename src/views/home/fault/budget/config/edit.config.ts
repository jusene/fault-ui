import { IForm } from "@/base-ui/form";

export const editFormConfig: IForm = {
  labelWidth: "80px",
  colLayout: {
    span: 24,
  },
  formItems: [
    {
      field: "name",
      type: "input",
      label: "故障周期",
      placeholder: "请输入故障周期",
      otheroptions: {
        disabled: true,
      },
    },
    {
      field: "domain",
      type: "input",
      label: "业务组",
      placeholder: "请输入业务组",
      otheroptions: {
        disabled: true,
      },
    },
    {
      field: "P0",
      type: "input-number",
      label: "P0",
      otheroptions: {
        min: 0,
        max: 10,
      },
    },
    {
      field: "P1",
      type: "input-number",
      label: "P1",
      otheroptions: {
        min: 0,
        max: 10,
      },
    },
    {
      field: "P2",
      type: "input-number",
      label: "P2",
      otheroptions: {
        min: 0,
        max: 10,
      },
    },
    {
      field: "P3",
      type: "input-number",
      label: "P3",
      otheroptions: {
        min: 0,
        max: 10,
      },
    },
    {
      field: "P4",
      type: "input-number",
      label: "P4",
      otheroptions: {
        min: 0,
        max: 10,
      },
    },
  ],
  itemStyle: {
    padding: "1px 20px",
  },
};
