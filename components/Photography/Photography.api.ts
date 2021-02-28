import { firestore, storage } from 'config/firebase';

export const fetchPhotos = () =>
  firestore
    .collection('photography')
    .doc('photoDetails')
    .get()
    .then((doc) => {
      if (doc.exists) return doc.data();
      else throw Error('Photo details document does not exist!');
    })
    .catch((error: Error) => console.log(error));

export const fetchUrls = async (photos: firebase.firestore.DocumentData) => {
  const urlPromises: Promise<string>[] = [];

  const ids = Object.keys(photos);
  ids.forEach((id) => {
    const urlPromise: Promise<string> = storage.ref(`photography/${id}`).getDownloadURL();
    urlPromises.push(urlPromise);
  });

  return await Promise.all(urlPromises);
};
