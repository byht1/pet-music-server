import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as uuid from 'uuid';

const firebaseConfig = {
  apiKey: 'AIzaSyCiUN6LUx6t5fT9DNloEheHMcvVSywfou4',
  authDomain: 'music-db-11801.firebaseapp.com',
  projectId: 'music-db-11801',
  storageBucket: 'music-db-11801.appspot.com',
  messagingSenderId: '604952712012',
  appId: '1:604952712012:web:ff9a50393d927a8f0f35e9',
};

initializeApp(firebaseConfig);

const storage = getStorage();

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

export async function fbStorage(type, file): Promise<string> {
  const fileExtension = file.originalname.split('.').pop();
  const fileName = uuid.v4() + '.' + fileExtension;
  file.originalname = fileName;
  const storageRef = ref(storage, `${type}/${file.originalname}`);
  const metadata = {
    contentType: file.mimetype,
  };
  try {
    await uploadBytes(storageRef, file.buffer, metadata);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    return error;
  }
}
