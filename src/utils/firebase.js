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
  messagingSenderId: '700642530154'
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

export const storage = firebase.storage();
