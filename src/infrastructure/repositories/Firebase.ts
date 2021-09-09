import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

export class Firebase {
  private static app: FirebaseApp;

  private constructor() {
    // remove constructor
  }

  private static initFirebase() {
    if (!this.app) {
      const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
      };

      this.app = initializeApp(firebaseConfig);
    }
  }

  private static checkAppExists() {
    if (!this.app) {
      this.initFirebase();
    }
  }

  public static get database(): Firestore {
    this.checkAppExists();
    return getFirestore(this.app);
  }

  public static get storage(): FirebaseStorage {
    this.checkAppExists();
    return getStorage(this.app);
  }
}
