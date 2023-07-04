export const propList = [
  { prop: "name", label: "名称", minWidth: "100px" },
  { prop: "memStatus", label: "Mem(Request)/Mem(Limit)" },
  { prop: "restartTimes", label: "重启次数" },
  { prop: "status", label: "状态" },
  { prop: "nodeName", label: "节点" },
  { prop: "podIp", label: "IP地址" },
  { prop: "createTime", label: "创建时间", slotName: ["createTime"] },
  {
    prop: "operation",
    label: "操作",
    minWidth: "160px",
    slotName: ["offline", "restart", "destroy"],
  },
];
