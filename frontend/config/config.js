// https://umijs.org/config/
import os from "os";
import pageRoutes from "./router.config";
import webpackplugin from "./plugin.config";
import defaultSettings from "../src/defaultSettings";

export default {
  // add for transfer to umi
  plugins: [
    [
      "umi-plugin-react",
      {
        antd: true,
        dva: {
          hmr: true
        },
        locale: {
          enable: true, // default false
          default: "zh-CN", // default zh-CN
          baseNavigator: true // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          loadingComponent: "./components/PageLoading/index"
        },
        polyfills: ["ie11"],
        ...(!process.env.TEST && os.platform() === "darwin"
          ? {
              dll: {
                include: ["dva", "dva/router", "dva/saga", "dva/fetch"],
                exclude: ["@babel/runtime"]
              },
              hardSource: false,
            }
          : {})
      }
    ]
  ],
  define: {
    APP_TYPE: process.env.APP_TYPE || ""
  },
  // 路由配置
  routes: pageRoutes,
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    "primary-color": defaultSettings.primaryColor
  },
  externals: {
    "@antv/data-set": "DataSet"
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes("node_modules") ||
        context.resourcePath.includes("ant.design.pro.less") ||
        context.resourcePath.includes("global.less")
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace(".less", "");
        const arr = antdProPath
          .split("/")
          .map(a => a.replace(/([A-Z])/g, "-$1"))
          .map(a => a.toLowerCase());

        let result = `antd-pro${arr.join("_")}-${localName}`.replace(
          /--/g,
          "-"
        );
        result = result.replace(/\\/g, "_");
        result = result.replace(/\./g, "_");
        return result;
      }
      return localName;
    }
  },
  manifest: {
    name: "ant-design-pro",
    background_color: "#FFF",
    description:
      "An out-of-box UI solution for enterprise applications as a React boilerplate.",
    display: "standalone",
    start_url: "/index.html",
    icons: [
      {
        src: "/favicon.png",
        sizes: "48x48",
        type: "image/png"
      }
    ]
  },

  chainWebpack: webpackplugin,
  cssnano: {
    mergeRules: false
  },
  publicPath: "http://www.zhaohui.wiki/frontend/",//build 的时候使用
  // publicPath: "http://localhost/frontend/",//build 的时候使用
  //base:'/frontend/',//会被拼到网站根目录后边window.routerBase 没有什么卵用
  runtimePublicPath:true,
  history: "hash",
  //exportStatic:true,
  //devtool: "inline-source-map"
};
