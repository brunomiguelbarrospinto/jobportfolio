export const IS_LOCAL = process.env.VUE_APP_ENV === "local";
export const IS_STAGING = process.env.VUE_APP_ENV === "staging";
export const IS_PRODUCTION = process.env.VUE_APP_ENV === "production";
export const TITLE_PREFIX = process.env.VUE_APP_TITLE_PREFIX;
console.log(process.env.VUE_APP_ENV);
