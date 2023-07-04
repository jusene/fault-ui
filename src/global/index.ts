import { App } from "vue";

import registerProperties from "./register-properties";
import registerEchart from "./register-echarts";

export function globalProperties(app: App): void {
  app.use(registerProperties);
  // app.use(registerEchart);
}
