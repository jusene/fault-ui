import { IForm } from "@/base-ui/form";

export const searchFormConfig: IForm = {
  labelWidth: "120px",
  colLayout: {
    span: 8,
  },
  formItems: [
    {
      field: "name",
      type: "slot",
      label: "故障标题",
      placeholder: "请输入故障标题,支持模糊匹配",
    },
    {
      field: "domain",
      type: "select",
      label: "影响业务域",
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
    {
      field: "group",
      type: "select",
      label: "责任团队",
      placeholder: "请输入责任团队",
      options: [],
    },
    {
      field: "tag",
      type: "select",
      label: "故障标签",
      placeholder: "请输入故障标签",
      options: [],
    },
    {
      field: "source",
      type: "select",
      label: "故障渠道",
      placeholder: "请输入故障渠道",
      options: [],
    },
  ],
  itemStyle: {
    padding: "10px 30px",
  },
};
