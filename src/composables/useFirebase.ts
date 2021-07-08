import firebase from "firebase/app";
import "firebase/auth";
import { ref } from "vue";
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

const currentAuthUser: any = ref(null);

export const useFirebase = (): {
  initializeApp: any;
  currentAuthUser: any;
  signInWithPopup: any;
  signOut: any;
} => {
  function initializeApp() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((authUser) => {
      currentAuthUser.value = authUser;
    });
  }

  async function signInWithPopup(platform: string) {
    await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  async function signOut() {
    await firebase.auth().signOut();
  }

  return {
    initializeApp,
    currentAuthUser,
    signInWithPopup,
    signOut,
  };
};
