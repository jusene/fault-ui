import { App } from "vue";

import { formatUtcString, zhToFormat, diffTime } from "@/utils/time-utils";

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value);
    },
    formatCSTTime(value: string) {
      return zhToFormat(value);
    },
    dateTimeDiff(daterime: string, nextDateTime: string) {
      return diffTime(daterime, nextDateTime);
    },
  };
}
