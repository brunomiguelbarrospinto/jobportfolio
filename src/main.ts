import { createApp, App as Application } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.scss";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// import LogRocket from "logrocket";
// LogRocket.init("hsxssp/jobportfolio");

import "vue-vite-components/dist/style.css";

import { useFirebase } from "@/composables/useFirebase";
import useLocale from "./composables/useLocale";
const { setCurrentAuthUser } = useFirebase();
let app: Application;

const { i18n } = useLocale();
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  setCurrentAuthUser(user);
  if (!app) {
    app = createApp(App).use(i18n.value);
    app.use(router).mount("#app");
  }
});
