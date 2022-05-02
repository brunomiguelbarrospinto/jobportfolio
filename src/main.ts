import { createApp, App as Application } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.scss";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import LogRocket from "logrocket";
LogRocket.init("hsxssp/jobportfolio");
import {
  ButtonComponent,
  IconComponent,
  InteractiveElementComponent,
  IconLoadingAnimatedComponent,
  TagComponent,
  CardComponent,
} from "vue-vite-components";

import "vue-vite-components/dist/style.css";
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
    app.component("ButtonComponent", ButtonComponent); // global registration - can be used anywhere
    app.component("IconComponent", IconComponent); // global registration - can be used anywhere
    app.component("InteractiveElementComponent", InteractiveElementComponent); // global registration - can be used anywhere
    app.component("IconLoadingAnimatedComponent", IconLoadingAnimatedComponent); // global registration - can be used anywhere
    app.component("TagComponent", TagComponent); // global registration - can be used anywhere
    app.component("CardComponent", CardComponent); // global registration - can be used anywhere

    app.use(router).mount("#app");
  }
});
