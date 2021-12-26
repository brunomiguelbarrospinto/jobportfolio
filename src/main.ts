import { createApp, App as Application } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.scss";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//Global components
import Form from "@/components/common/form/Form.vue";

import { useFirebase } from "@/composables/useFirebase";
const { setCurrentAuthUser } = useFirebase();
let app: Application;

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  setCurrentAuthUser(user);
  if (!app) {
    app = createApp(App);
    app.component("Form", Form); // global registration - can be used anywhere
    app.use(store).use(router).mount("#app");
  }
});
