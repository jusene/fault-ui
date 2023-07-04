import { IForm } from "@/base-ui/form";

export const editFormConfig: IForm = {
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
      field: "domainLevel",
      type: "select",
      label: "业务域等级",
      placeholder: "请输入业务域等级",
      options: [],
    },
    {
      field: "source",
      type: "select",
      label: "故障渠道",
      placeholder: "请输入故障渠道",
      options: [],
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
      field: "tag",
      type: "select",
      label: "故障标签",
      placeholder: "请输入故障标签",
      options: [],
      otheroptions: {
        multiple: true,
        collapseTags: true,
        collapseTagsTooltip: true,
      },
    },
    {
      field: "level",
      type: "select",
      label: "故障等级",
      placeholder: "请输入故障等级",
      options: [],
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
      field: "faultReportAt",
      type: "datepicker",
      label: "故障上报时间",
      placeholder: "请输入故障上报时间",
      otheroptions: {
        type: "datetime",
      },
    },
    {
      field: "faultActionAt",
      type: "datepicker",
      label: "故障响应时间",
      placeholder: "请输入故障响应时间",
      otheroptions: {
        type: "datetime",
      },
    },
    {
      field: "faultStopAt",
      type: "datepicker",
      label: "故障止血时间",
      placeholder: "请输入故障止血时间",
      otheroptions: {
        type: "datetime",
      },
    },
    {
      field: "faultEndAt",
      type: "datepicker",
      label: "故障恢复时间",
      placeholder: "请输入故障恢复时间",
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
      field: "yuQue",
      type: "input",
      label: "语雀链接",
      placeholder: "请输入语雀链接",
    },
    {
      field: "mainResponsibility",
      type: "slot",
      label: "主责",
      placeholder: "请输入主要责任人",
    },
    {
      field: "secondResponsibility",
      type: "slot",
      label: "次责",
      placeholder: "请输入次责责任人",
    },
    {
      field: "group",
      type: "select",
      label: "责任团队",
      placeholder: "请输入责任团队",
      options: [],
    },
    {
      field: "sla",
      type: "select",
      label: "可用性故障",
      placeholder: "请输入状态",
      options: [
        { title: "是", value: "是" },
        { title: "否", value: "否" },
      ],
    },
  ],
  itemStyle: {
    padding: "1px 20px",
  },
};
