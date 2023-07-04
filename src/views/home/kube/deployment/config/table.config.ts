export const propList = [
  { prop: "name", label: "名称", minWidth: "100px" },
  { prop: "labels", label: "标签", width: "150px", slotName: ["labels"] },
  { prop: "replicas", label: "副本数/可用副本数" },
  { prop: "cpuRequest", label: "CPU (Request)" },
  { prop: "cpuLimit", label: "CPU (Limit)" },
  { prop: "memRequest", label: "Mem (Request)" },
  { prop: "memLimit", label: "Mem (Limit)" },
  { prop: "createTime", label: "创建时间", slotName: ["createTime"] },
  {
    prop: "operation",
    label: "操作",
    minWidth: "160px",
    slotName: ["resource", "delete"],
  },
];
