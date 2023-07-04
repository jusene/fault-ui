const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

const isProduction = process.env.NODE_ENV === "production";

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: !isProduction,
  devServer: {
    client: {
      overlay: {
        runtimeErrors: false,
      },
    },
    // historyApiFallback: { index: "/index.html" },
    proxy: {
      "/apis": {
        target: "http://kube-center.iguming.net",
        changeOrigin: true,
        pathRewrite: {
          "^/apis": "",
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
});
