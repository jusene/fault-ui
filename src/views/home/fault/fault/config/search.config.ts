import { IForm } from "@/base-ui/form";

export const searchFormConfig: IForm = {
  labelWidth: "120px",
  colLayout: {
    span: 8,
  },
  formItems: [
    {
      field: "name",
      type: "input",
      label: "名称",
      placeholder: "请输入故障名",
    },
    {
      field: "domain",
      type: "select",
      label: "业务域",
      placeholder: "请输入业务域",
      options: [],
    },
    {
      field: "time",
      type: "datepicker",
      label: "故障发生时间",
      otheroptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "datetimerange",
      },
    },
    {
      field: "level",
      type: "select",
      label: "故障级别",
      placeholder: "请输入故障级别",
      options: [],
    },
    {
      field: "domainLevel",
      type: "select",
      label: "业务域等级",
      placeholder: "请输入业务域等级",
      options: [],
    },
    {
      field: "status",
      type: "select",
      label: "故障状态",
      placeholder: "请输入故障状态",
      options: [],
    },
  ],
  itemStyle: {
    padding: "10px 30px",
  },
};
