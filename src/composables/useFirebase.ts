import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

import {
  getAuth,
  signInWithPopup as _signInWithPopup,
  GoogleAuthProvider,
  signOut as _signOut,
} from "firebase/auth";
import { ref, Ref } from "vue";

const firebaseConfig = {
  apiKey: "AIzaSyB342x-1-ffWlo27BYuW6cX0VlYclcJe6M",
  authDomain: "jobportfolio-8a4e8.firebaseapp.com",
  databaseURL:
    "https://jobportfolio-8a4e8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jobportfolio-8a4e8",
  storageBucket: "jobportfolio-8a4e8.appspot.com",
  messagingSenderId: "628215896834",
  appId: "1:628215896834:web:ea574ea60c6f27cb87c01b",
  measurementId: "G-4K527RNGKT",
};

const currentAuthUser: Ref<any | null> = ref(null);

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export const useFirebase = (): {
  database: any;
  setCurrentAuthUser: (authUser: any | null) => void;
  currentAuthUser: Ref<any | null>;
  signInWithPopup: (platform: string) => Promise<void>;
  signOut: () => void;
  convertObjectsCollectionsToArrayCollections;
} => {
  function setCurrentAuthUser(authUser: any | null): void {
    currentAuthUser.value = authUser;
  }

  async function signInWithPopup(platform: string): Promise<void> {
    const auth = getAuth();
    if (platform === "google") {
      const provider = new GoogleAuthProvider();
      await _signInWithPopup(auth, provider);
    }
  }

  function convertObjectsCollectionsToArrayCollections(objectCollection) {
    if (objectCollection) {
      const ids = Object.keys(objectCollection);
      return ids.map((key) => {
        return {
          id: key,
          ...objectCollection?.[key],
        };
      });
    }
    return;
  }

  async function signOut(): Promise<void> {
    const auth = getAuth();
    await _signOut(auth);
  }

  return {
    database,
    setCurrentAuthUser,
    currentAuthUser,
    signInWithPopup,
    signOut,
    convertObjectsCollectionsToArrayCollections,
  };
};
