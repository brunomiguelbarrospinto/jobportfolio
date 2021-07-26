import firebase from "firebase/app";
import { User as AuthUserInterface } from "@firebase/auth-types";
import "firebase/auth";
import "firebase/database";
import { ref, Ref } from "vue";

const firebaseConfig = {
  apiKey: "AIzaSyAGGMUdvTxSKzq_jQoBeSmPhbYsW53Wpf4",
  authDomain: "full-vue-project.firebaseapp.com",
  databaseURL: "https://full-vue-project.firebaseio.com",
  projectId: "full-vue-project",
  storageBucket: "full-vue-project.appspot.com",
  messagingSenderId: "927745880591",
  appId: "1:927745880591:web:5a785f1a8f2c6c4ab3e97a",
  measurementId: "G-501JKMCMYB",
};

const currentAuthUser: Ref<AuthUserInterface | null> = ref(null);

export const useFirebase = (): {
  // eslint-disable-next-line
  firebase: any;
  initializeApp: () => void;
  setCurrentAuthUser: (authUser: AuthUserInterface) => void;
  currentAuthUser: Ref<AuthUserInterface | null>;
  signInWithPopup: (platform: string) => void;
  signOut: () => void;
  convertObjectsCollectionsToArrayCollections: any;
} => {
  function initializeApp() {
    firebase.initializeApp(firebaseConfig);
  }

  function setCurrentAuthUser(authUser: AuthUserInterface): void {
    currentAuthUser.value = authUser;
  }

  function signInWithPopup(platform: string): void {
    if (platform === "google") {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  function convertObjectsCollectionsToArrayCollections(objectColection: any) {
    if (objectColection) {
      const ids = Object.keys(objectColection);
      return ids.map((key) => {
        return {
          id: key,
          ...objectColection?.[key],
        };
      });
    }
    return;
  }

  async function signOut(): Promise<void> {
    await firebase.auth().signOut();
  }

  return {
    firebase,
    initializeApp,
    setCurrentAuthUser,
    currentAuthUser,
    signInWithPopup,
    signOut,
    convertObjectsCollectionsToArrayCollections,
  };
};
