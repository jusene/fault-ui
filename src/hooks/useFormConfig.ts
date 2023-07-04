import {
  getDomain,
  getDomainLevel,
  getLevel,
  getSource,
  getStatus,
  getTag,
} from "@/services/axios/fault/fault";

export function useFormConfig(srcFormConfig: any, items: string[]) {
  for (const item of items) {
    let formItem: any = "";
    switch (item) {
      case "level":
        formItem = srcFormConfig.formItems.find((item: { field: string }) => {
          if (item.field === "level") {
            return item;
          }
        });
        getLevel().then((res) => {
          if (formItem?.options) {
            formItem.options = res.data.msg;
          }
        });
        break;
      case "domainLevel":
        formItem = srcFormConfig.formItems.find((item: { field: string }) => {
          if (item.field === "domainLevel") {
            return item;
          }
        });
        getDomainLevel().then((res) => {
          if (formItem?.options) {
            formItem.options = res.data.msg;
          }
        });
        break;
      case "status":
        formItem = srcFormConfig.formItems.find((item: { field: string }) => {
          if (item.field === "status") {
            return item;
          }
        });
        getStatus().then((res) => {
          if (formItem?.options) {
            formItem.options = res.data.msg;
          }
        });
        break;
      case "domain":
        formItem = srcFormConfig.formItems.find((item: { field: string }) => {
          if (item.field === "domain") {
            return item;
          }
        });
        getDomain().then((res) => {
          if (formItem?.options) {
            formItem.options = res.data.msg;
          }
        });
        break;
      case "tag":
        formItem = srcFormConfig.formItems.find((item: { field: string }) => {
          if (item.field === "tag") {
            return item;
          }
        });
        getTag().then((res) => {
          if (formItem?.options) {
            formItem.options = res.data.msg;
          }
        });
        break;
      case "source":
        formItem = srcFormConfig.formItems.find((item: { field: string }) => {
          if (item.field === "source") {
            return item;
          }
        });
        getSource().then((res) => {
          if (formItem?.options) {
            formItem.options = res.data.msg;
          }
        });
        break;
      case "group":
        formItem = srcFormConfig.formItems.find((item: { field: string }) => {
          if (item.field === "group") {
            return item;
          }
        });
        getDomain().then((res) => {
          if (formItem?.options) {
            formItem.options = res.data.msg;
          }
        });
    }
  }
  return srcFormConfig;
}
