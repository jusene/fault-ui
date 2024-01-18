import { IForm } from "@/base-ui/form";

export const FormConfig: IForm = {
  labelWidth: "120px",
  colLayout: {
    span: 24,
  },
  formItems: [
    {
      field: "incidentId",
      type: "input",
      label: "事件ID",
      placeholder: "请输入事件ID",
      otheroptions: {
        disabled: true,
      },
      rules: [
        {
          required: true,
          message: "事件ID是必传内容~",
          trigger: "blur",
        },
      ],
    },
    {
      field: "incidentTitle",
      type: "input",
      label: "事件标题",
      placeholder: "请输入事件标题",
      otheroptions: {
        disabled: true,
      },
      rules: [
        {
          required: true,
          message: "事件标题是必传内容~",
          trigger: "blur",
        },
      ],
    },
    {
      field: "incidentLevel",
      type: "input",
      label: "事件等级",
      placeholder: "请输入事件等级",
      otheroptions: {
        disabled: true,
      },
      rules: [
        {
          required: true,
          message: "事件等级是必传内容~",
          trigger: "blur",
        },
      ],
    },
    {
      field: "incidentStatus",
      type: "input",
      label: "事件状态",
      placeholder: "请输入事件状态",
      otheroptions: {
        disabled: true,
      },
      rules: [
        {
          required: true,
          message: "事件状态是必传内容~",
          trigger: "blur",
        },
      ],
    },
    {
      field: "assignUserName",
      type: "slot",
      label: "分配人",
      placeholder: "请输入分配人",
      rules: [
        {
          required: true,
          message: "分配人是必传内容~",
          trigger: "blur",
        },
      ],
    },
  ],
  itemStyle: {
    padding: "1px 20px",
  },
};
