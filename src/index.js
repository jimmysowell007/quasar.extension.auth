"use strict";
const path = require("path");
function extendConf(conf) {
  const requiredPlugins = ["Notify"];

  requiredPlugins.forEach((plugin) => {
    if (!conf.framework.plugins.includes(plugin)) {
      conf.framework.plugins.push(plugin);
    }
  });

  conf.boot.push("~@sowell/quasar-app-extension-auth/src/boot/register.ts");

  conf.boot.push("~@sowell/quasar-app-extension-auth/src/boot/store.ts");

  conf.boot.push("~@sowell/quasar-app-extension-auth/src/boot/router.ts");

  conf.boot.push(
    "~@sowell/quasar-app-extension-auth/src/boot/router-guards.ts"
  );
  conf.boot.push("~@sowell/quasar-app-extension-auth/src/boot/axios.ts");

  conf.boot.push("~@sowell/quasar-app-extension-auth/src/boot/i18n.ts");

  conf.build.transpileDependencies.push(/quasar-app-extension-auth[\\/]src/);

  console.log("Boot sowell auth");
}
const chainWebpack = (ctx, chain) => {
  chain.resolve.alias.set(
    "@sowell/auth",
    path.resolve(__dirname, "./components")
  );
};
module.exports = function (api) {
  api.compatibleWith("quasar", "^2.0.0");
  api.compatibleWith("@quasar/app", "^3.0.0");
  api.chainWebpack((chain) => chainWebpack(api.ctx, chain));
  api.extendQuasarConf(extendConf);
};
