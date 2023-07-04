import { IForm } from "@/base-ui/form";

export const noticeFormConfig: IForm = {
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
    },
    {
      field: "reason",
      type: "input",
      label: "故障原因",
      placeholder: "请输入故障原因",
      otheroptions: {
        autosize: true,
        type: "textarea",
      },
    },
    {
      field: "process",
      type: "input",
      label: "当前进展",
      placeholder: "请输入当前进展",
      otheroptions: {
        autosize: true,
        type: "textarea",
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
    {
      field: "faultStartAt",
      type: "datepicker",
      label: "故障发生时间",
      placeholder: "请输入故障发生时间",
      otheroptions: {
        type: "datetime",
      },
    },
    {
      field: "status",
      type: "select",
      label: "状态",
      placeholder: "请输入当前状态",
      options: [],
    },
    {
      field: "dingUrl",
      type: "input",
      label: "复盘机器人url",
      placeholder: "请输入复盘机器人钉钉url",
      isHidden: true,
    },
  ],
  itemStyle: {
    padding: "1px 20px",
  },
};
