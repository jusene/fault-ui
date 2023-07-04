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
      placeholder: "请输入应用名",
    },
    {
      field: "domain",
      type: "select",
      label: "业务域",
      placeholder: "请输入业务域",
      options: [
        { title: "智慧门店", value: "ws" },
        { title: "ToC业务", value: "toc" },
        { title: "集团运营", value: "co" },
        { title: "IOT业务", value: "iot" },
      ],
    },
    {
      field: "time",
      type: "datepicker",
      label: "创建时间",
      otheroptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "datetimerange",
      },
    },
  ],
  itemStyle: {
    padding: "10px 40px",
  },
};
