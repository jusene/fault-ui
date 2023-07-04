export const propList = [
  { prop: "username", label: "用户名", minWidth: "100px" },
  { prop: "realname", label: "用户" },
  { prop: "role", label: "角色" },
  { prop: "createTime", label: "创建时间", slotName: ["createTime"] },
  { prop: "updateTime", label: "更新时间", slotName: ["updateTime"] },
  {
    prop: "operation",
    label: "操作",
    minWidth: "160px",
    slotName: ["edit", "delete"],
  },
];
