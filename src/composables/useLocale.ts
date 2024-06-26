import { ref } from "vue";
import { createI18n, LocaleMessages, VueMessageType } from "vue-i18n";

const currentLocale = ref(localStorage.getItem("locale") || "es");
const locales = ["es", "en"];

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages(): LocaleMessages<VueMessageType> {
  const locales = require.context(
    "../locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages: LocaleMessages<VueMessageType> = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key).default;
    }
  });
  return messages;
}

const i18n = ref(
  createI18n({
    legacy: false,
    locale: currentLocale.value || process.env.VUE_APP_I18N_LOCALE || "es",
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "es",
    messages: loadLocaleMessages(),
    globalInjection: true,
  })
);
function setLocale(locale) {
  if (locales.includes(locale)) {
    currentLocale.value = locale;
    localStorage.setItem("locale", locale);
    i18n.value.global.locale = locale;
  }
}
export default function useLocale() {
  return { locales, currentLocale, setLocale, i18n };
}
