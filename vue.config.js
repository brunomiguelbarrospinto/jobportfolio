const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  pluginOptions: {
    i18n: {
      locale: "es",
      fallbackLocale: "es",
      localeDir: "locales",
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },
});
