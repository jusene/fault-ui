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
      placeholder: "请输入故障标题",
    },
    {
      field: "action",
      type: "slot",
      label: "action",
      placeholder: "请输入落地action",
    },
    {
      field: "time",
      type: "datepicker",
      label: "截止时间",
      otheroptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "datetimerange",
      },
    },
    {
      field: "status",
      type: "select",
      label: "状态",
      placeholder: "请输入action状态",
      options: [
        { title: "待办", value: "待办" },
        { title: "处理中", value: "处理中" },
        { title: "完成", value: "完成" },
      ],
    },
    {
      field: "executor",
      type: "slot",
      label: "执行者",
      placeholder: "请输入执行者",
      options: [],
    },
    {
      field: "overdue",
      type: "select",
      label: "逾期",
      placeholder: "请输入action是否逾期",
      options: [
        { title: "是", value: "是" },
        { title: "否", value: "否" },
      ],
    },
  ],
  itemStyle: {
    padding: "10px 30px",
  },
};
