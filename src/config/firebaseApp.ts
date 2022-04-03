import { initializeApp } from 'firebase/app';

import { getFirestore, getDocs, collection } from 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getChannels() {
  const channelCol = collection(db, 'channels');

  const userSnapshot = await getDocs(channelCol);
  const channelList = userSnapshot.docs.map((doc) => {
    const dataCopy = { ...doc.data(), id: doc.id };
    return dataCopy;
  });
  return channelList;
}
