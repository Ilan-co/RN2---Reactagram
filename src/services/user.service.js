import AsyncStorage from '@react-native-async-storage/async-storage';

import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { Alert } from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyDxTF75-7BjLzcsbdR9OYUgw8QoohjjqIE',
  authDomain: 'flutagram-57104.firebaseapp.com',
  databaseURL: 'https://flutagram-57104.firebaseio.com',
  projectId: 'flutagram-57104',
  storageBucket: 'flutagram-57104.appspot.com',
  messagingSenderId: '701825521843',
  appId: '1:701825521843:web:14378682bdd754453938c6',
  measurementId: 'G-5CP6H0PW43',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.default.auth();
const firestore = firebase.default.firestore();
const storage = firebase.default.storage();

async function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
    .then(async (user) => {
      await AsyncStorage.setItem('UID', user.user.uid);
      Alert.alert('', 'Connexion réussie');
      return true;
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-email') {
        Alert.alert('', 'Email invalide');
      }
      if (error.code === 'auth/user-not-found') {
        Alert.alert('', 'Email non inscrit');
      }
      if (error.code === 'auth/wrong-password') {
        Alert.alert('', 'Mauvais mot de passe');
      }
      return false;
    });
}

async function register(email, password, profilPicture, location) {
  return auth.createUserWithEmailAndPassword(email, password)
    .then(async (user) => {
      Alert.alert('', 'Inscription réussie');
      await AsyncStorage.setItem('UID', user.user.uid);
      firestore.collection('Flutagramers').doc(user.user.uid).set({
        uid: user.user.uid,
        location,
        name: email,
      });
      const result = await fetch(profilPicture);
      const blob = await result.blob();
      const metadata = {
        contentType: 'image/png',
      };
      const storageRef = storage.ref(`profilPicture/${user.user.uid}.png`);
      storageRef.put(blob, metadata).then(() => {
        storageRef.getDownloadURL().then((value) => {
          firestore.collection('Flutagramers').doc(user.user.uid).update({
            picture: value,
          });
        });
      });
      return user;
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('', 'Email déjà utilisé');
      }
      if (error.code === 'auth/invalid-email') {
        Alert.alert('', 'Email invalide');
      }
      if (error.code === 'auth/weak-password') {
        Alert.alert('', 'Le mot de passe doit contenir au moins 6 caractères');
      }
      return false;
    });
}

async function getProfil() {
  const uid = await AsyncStorage.getItem('UID');
  return firestore.collection('Flutagramers').doc(uid).get();
}

async function getUsers() {
  const snapshot = await firestore.collection('Flutagramers').get();
  const listUsers = [];
  snapshot.forEach((doc) => listUsers.push(doc.data()));
  return listUsers;
}

async function sendPicture(picture, location) {
  const result = await fetch(picture);
  const blob = await result.blob();
  const metadata = {
    contentType: 'image/png',
  };
  const uid = await AsyncStorage.getItem('UID');
  const name = `${uid}-${Date.now().toLocaleString()}`;
  const storageRef = storage.ref(`feed/${name}.png`);
  storageRef.put(blob, metadata).then(() => {
    storageRef.getDownloadURL().then((value) => {
      firestore.collection('Flutagramers').doc(uid).update(
        {
          feedPictures: firebase.default.firestore.FieldValue.arrayUnion({
            image: value,
            location,
          }),
        },
      );
    });
  });
}

async function getFeed() {
  const snapshot = await firestore.collection('Flutagramers').get();
  const listPictures = [];
  snapshot.forEach((doc) => {
    if (doc.data().feedPictures) {
      doc.data().feedPictures.forEach((element) => {
        listPictures.push(element);
      });
    }
  });
  return listPictures;
}

export {
  register, login, getProfil, getUsers, sendPicture, getFeed,
};
