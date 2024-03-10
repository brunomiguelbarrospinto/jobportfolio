//, connectDatabaseEmulator
import {
  GoogleAuthProvider,
  signInWithPopup as _signInWithPopup,
  signOut as _signOut,
  getAuth,
} from "firebase/auth";
import { Ref, ref } from "vue";

//import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from "firebase/app";

//import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7UnkM2ISYQzV9QPzu-7ZrK4oILcS0Ynw",
  authDomain: "jobportfolio-7ef63.firebaseapp.com",
  projectId: "jobportfolio-7ef63",
  storageBucket: "jobportfolio-7ef63.appspot.com",
  messagingSenderId: "871726158143",
  appId: "1:871726158143:web:28573289c119657795c38a",
  measurementId: "G-GXDTC16GMK",
  databaseURL:
    "https://jobportfolio-7ef63-default-rtdb.europe-west1.firebasedatabase.app",
};

const currentAuthUser: Ref<any | null> = ref(null);

const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const database = getDatabase(firebaseApp);
// if (location.hostname === "localhost") {
//   // Point to the RTDB emulator running on localhost.
//   connectDatabaseEmulator(database, "localhost", 9000);
// }

//const storage = getStorage(firebaseApp);

export const useFirebase = (): {
  database: any;
  setCurrentAuthUser: (authUser: any | null) => void;
  currentAuthUser: Ref<any | null>;
  signInWithPopup: (platform: string) => Promise<void>;
  signOut: () => void;
  convertObjectsCollectionsToArrayCollections: (
    objectCollection:
      | {
          [key: string]: any;
        }
      | undefined
  ) => any;
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

  function convertObjectsCollectionsToArrayCollections(
    objectCollection:
      | {
          [key: string]: any;
        }
      | undefined
  ): any {
    if (objectCollection) {
      const ids = Object.keys(objectCollection);
      return ids.map((key) => {
        return {
          id: key,
          ...objectCollection?.[key],
        };
      });
    }
    return null;
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
