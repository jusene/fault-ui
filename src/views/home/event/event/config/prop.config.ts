export const propList = [
  { prop: "incidentId", label: "事件ID" },
  { prop: "incidentTitle", label: "事件标题" },
  { prop: "incidentLevel", label: "事件等级" },
  { prop: "incidentStatus", label: "事件状态" },
  { prop: "relatedServiceName", label: "服务名" },
  { prop: "assignUserName", label: "分配人" },
  { prop: "assignTime", label: "分配时间" },
  { prop: "responseTime", label: "响应时间" },
  { prop: "finishTime", label: "完成时间" },
  { prop: "description", label: "事件原因" },
  { prop: "remark", label: "解决方法" },
  {
    prop: "operation",
    label: "操作",
    minWidth: "145px",
    slotName: ["source", "response", "finish"],
  },
];
