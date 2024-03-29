export const propList = [
  { prop: "name", label: "故障标题", minWidth: "100px", slotName: ["title"] },
  { prop: "domain", label: "影响业务域", slotName: ["domain"] },
  { prop: "tag", label: "故障标签", slotName: ["tag"] },
  {
    prop: "category",
    label: "故障类别",
    minWidth: "100px",
    slotName: ["category"],
  },
  { prop: "level", label: "故障级别" },
  { prop: "status", label: "故障状态" },
  {
    prop: "faultStartAt",
    label: "故障发生时间",
    slotName: ["createTime"],
    minWidth: "100px",
  },
  // {
  //   prop: "faultStopTime",
  //   label: "故障止血时长",
  //   slotName: ["stopTime"],
  // },
  {
    prop: "faultEndTime",
    label: "故障恢复时长",
    slotName: ["endTime"],
  },
  {
    prop: "group",
    label: "责任团队",
  },
  {
    prop: "operation",
    label: "操作",
    minWidth: "145px",
    slotName: ["notice", "edit", "history", "action"],
  },
];
