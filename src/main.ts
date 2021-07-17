import { createApp, App as Application } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.scss";
import { User as AuthUserInterface } from "@firebase/auth-types";

import { useFirebase } from "@/composables/useFirebase";
const { initializeApp, firebase, setCurrentAuthUser } = useFirebase();
initializeApp();
let app: Application;

firebase.auth().onAuthStateChanged((authUser: AuthUserInterface) => {
  setCurrentAuthUser(authUser);
  if (!authUser) {
    router.push({ name: "login" });
  }
  if (!app) {
    app = createApp(App);
    app.use(store).use(router).mount("#app");
  }
});
