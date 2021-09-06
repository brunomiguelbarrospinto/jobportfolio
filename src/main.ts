import { createApp, App as Application } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.scss";
import { User as AuthUserInterface } from "@firebase/auth-types";

//Global components
import Form from "@/components/common/form/Form.vue";

import { useFirebase } from "@/composables/useFirebase";
const { initializeApp, firebase, setCurrentAuthUser } = useFirebase();
initializeApp();
let app: Application;

firebase.auth().onAuthStateChanged((authUser: AuthUserInterface) => {
  setCurrentAuthUser(authUser);
  if (!app) {
    app = createApp(App);
    app.component("Form", Form); // global registration - can be used anywhere
    app.use(store).use(router).mount("#app");
  }
});
