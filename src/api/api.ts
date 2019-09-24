import { firestore } from 'config/firebase';

export const fetchFeatureFlags = () =>
  firestore
    .collection('feature')
    .doc('flags')
    .get()
    .then(doc => {
      if (doc.exists) return doc.data();
      else throw Error('Feature flags do not exist!');
    })
    .catch((error: Error) => console.log(error));
