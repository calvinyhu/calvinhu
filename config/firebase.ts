import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import { FIREBASE_API_KEY } from './secrets';

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'calvin-hu.firebaseapp.com',
  databaseURL: 'https://calvin-hu.firebaseio.com',
  projectId: 'calvin-hu',
  storageBucket: 'calvin-hu.appspot.com',
  messagingSenderId: '700642530154',
};

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
