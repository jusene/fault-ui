import { IForm } from "@/base-ui/form";

export const searchFormConfig: IForm = {
  labelWidth: "120px",
  colLayout: {
    span: 8,
  },
  formItems: [
    {
      field: "incidentId",
      type: "input",
      label: "事件ID",
      placeholder: "请输入事件ID",
    },
    {
      field: "incidentTitle",
      type: "input",
      label: "事件标题",
      placeholder: "请输入事件标题",
      options: [],
    },
    {
      field: "incidentLevel",
      type: "select",
      label: "事件等级",
      placeholder: "请输入事件等级",
      options: [
        { title: "P1", value: "P1" },
        { title: "P2", value: "P2" },
        { title: "P3", value: "P3" },
        { title: "P4", value: "P4" },
      ],
    },
    {
      field: "incidentStatus",
      type: "select",
      label: "事件状态",
      placeholder: "请输入事件状态",
      options: [
        { title: "已分配", value: "ASSIGNED" },
        { title: "已响应", value: "RESPONDED" },
        { title: "已完成", value: "FINISHED" },
      ],
    },
    {
      field: "relatedServiceName",
      type: "input",
      label: "服务名",
      placeholder: "请输入服务名",
    },
    {
      field: "assignUserName",
      type: "input",
      label: "分配人",
      placeholder: "请输入事件分配人",
    },
    {
      field: "assignTime",
      type: "datepicker",
      label: "事件分配时间",
      otheroptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "datetimerange",
      },
    },
    {
      field: "responseTime",
      type: "datepicker",
      label: "事件响应时间",
      otheroptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "datetimerange",
      },
    },
    {
      field: "finishTime",
      type: "datepicker",
      label: "事件完成时间",
      otheroptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "datetimerange",
      },
    },
  ],
  itemStyle: {
    padding: "10px 30px",
  },
};
