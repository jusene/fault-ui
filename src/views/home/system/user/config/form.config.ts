import { IForm } from "@/base-ui/form";

export const FormConfig: IForm = {
  labelWidth: "120px",
  colLayout: {
    span: 24,
  },
  formItems: [
    {
      field: "username",
      type: "input",
      label: "用户名",
      placeholder: "请输入用户名",
      rules: [
        {
          required: true,
          message: "用户名是必传内容~",
          trigger: "blur",
        },
      ],
    },
    {
      field: "realname",
      type: "input",
      label: "真实姓名",
      placeholder: "请输入真实姓名",
      rules: [
        {
          required: true,
          message: "真实姓名是必传内容~",
          trigger: "blur",
        },
      ],
    },
    {
      field: "password",
      type: "password",
      label: "密码",
      placeholder: "请输入密码",
      rules: [
        {
          required: true,
          message: "密码是必传内容~",
          trigger: "blur",
        },
      ],
    },
    {
      field: "role",
      type: "select",
      label: "角色",
      placeholder: "请输入角色",
      options: [
        { title: "管理员", value: "admin" },
        { title: "开发", value: "dev" },
        { title: "测试", value: "test" },
      ],
      rules: [
        {
          required: true,
          message: "密码是必传内容~",
          trigger: "blur",
        },
      ],
    },
  ],
  itemStyle: {
    padding: "1px 20px",
  },
};
