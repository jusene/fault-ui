export const propList = [
  { prop: "name", label: "故障标题", minWidth: "100px" },
  { prop: "action", label: "action", slotName: ["action"] },
  { prop: "creator", label: "创建者" },
  { prop: "executor", label: "执行者" },
  { prop: "status", label: "状态" },
  { prop: "jiraKey", label: "jiraKey" },
  {
    prop: "dueTime",
    label: "截止时间",
    slotName: ["dueTime"],
    minWidth: "100px",
  },
  {
    prop: "actionCreateAt",
    label: "创建时间",
    slotName: ["createTime"],
    minWidth: "100px",
  },
  {
    prop: "operation",
    label: "操作",
    minWidth: "145px",
    slotName: ["edit", "notice", "done"],
  },
];
