import { IForm } from "@/base-ui/form";

export const FormConfig: IForm = {
  labelWidth: "120px",
  colLayout: {
    span: 24,
  },
  formItems: [
    {
      field: "name",
      type: "input",
      label: "故障标题",
      placeholder: "请输入故障名",
      otheroptions: {
        disabled: true,
      },
      rules: [
        {
          required: true,
          message: "action是必传内容~",
          trigger: "blur",
        },
      ],
    },
    {
      field: "action",
      type: "input",
      label: "action信息",
      placeholder: "请输入action信息",
      rules: [
        {
          required: true,
          message: "action是必传内容~",
          trigger: "blur",
        },
      ],
    },
    {
      field: "jiraKey",
      type: "input",
      label: "jira唯一键",
      placeholder: "如: XSWT-1960, 不是URL ",
      otheroptions: {
        disabled: true,
      },
      rules: [
        {
          required: true,
          message: "jiraKey是必传内容~",
          trigger: "blur",
        },
      ],
    },
    {
      field: "creator",
      type: "slot",
      label: "创建人",
      placeholder: "请输入创建人",
      rules: [
        {
          required: true,
          message: "创建人是必传内容~",
          trigger: "blur",
        },
      ],
    },
    {
      field: "executor",
      type: "slot",
      label: "执行人",
      placeholder: "请输入执行人",
      rules: [
        {
          required: true,
          message: "执行人是必传内容~",
          trigger: "blur",
        },
      ],
    },
    {
      field: "dueTime",
      type: "datepicker",
      label: "action截止时间",
      placeholder: "请输入action截止时间",
      otheroptions: {
        type: "datetime",
      },
      rules: [
        {
          required: true,
          message: "截止时间是必传内容~",
          trigger: "blur",
        },
      ],
    },
    {
      field: "status",
      type: "input",
      label: "状态",
      placeholder: "状态",
      otheroptions: {
        disabled: true,
      },
    },
    {
      field: "taskId",
      type: "input",
      label: "待办taskId",
      placeholder: "待办taskId",
      otheroptions: {
        disabled: true,
      },
    },
  ],
  itemStyle: {
    padding: "1px 20px",
  },
};
