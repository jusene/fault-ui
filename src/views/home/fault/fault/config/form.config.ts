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
        isPrepend: true,
      },
      rules: [
        {
          required: true,
          message: "故障标题是必传内容~",
          trigger: "blur",
        },
      ],
    },
    {
      field: "domain",
      type: "select",
      label: "影响业务域",
      placeholder: "请输入业务域",
      options: [],
      otheroptions: {
        multiple: true,
        collapseTags: true,
        collapseTagsTooltip: true,
      },
      rules: [
        {
          required: true,
          message: "业务域是必传内容~",
          trigger: "blur",
        },
      ],
    },
    {
      field: "description",
      type: "input",
      label: "故障描述",
      placeholder: "请输入故障描述",
      otheroptions: {
        autosize: true,
        type: "textarea",
      },
      rules: [
        {
          required: true,
          message: "故障描述是必传内容~",
          trigger: "blur",
        },
      ],
    },
    {
      field: "faultStartAt",
      type: "datepicker",
      label: "故障通告时间",
      placeholder: "请输入故障通告时间",
      otheroptions: {
        type: "datetime",
      },
    },
    {
      field: "processPeople",
      type: "slot",
      label: "处理人",
      placeholder: "请输入处理人",
    },
    {
      field: "fllowPeople",
      type: "slot",
      label: "跟进人",
      placeholder: "请输入跟进人",
    },
  ],
  itemStyle: {
    padding: "1px 20px",
  },
};
