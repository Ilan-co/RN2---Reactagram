import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

async function login(email, password) {
  auth().signInWithEmailAndPassword(email, password)
    .then(async (user) => {
      await AsyncStorage.setItem('UID', user.user.uid);
      console.log('Connexion réussie');
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-email') {
        console.log('Email invalide');
      }
    });
}

async function register(email, password, profilPicture) {
  auth().createUserWithEmailAndPassword(email, password)
    .then(async (user) => {
      console.log('Inscription réussie');
      const location = getLocation();
      await AsyncStorage.setItem('UID', user.user.uid);
      firestore().collection('Flutagramers').doc(user.user.uid).set({
        token: await messaging().getToken(),
        uid: user.user.uid,
        location,
        name: email,
        followers: Array[''],
        follows: Array[''],
      });
      const file = File(profilPicture).copy(`${user.user.uid}.png`);
      const storageRef = storage().ref(`profilPicture/${user.user.uid}`);
      const task = storageRef.putFile(file);
      task.then((value) => firestore().collection('Flutagramers').doc(user.user.uid).update({ picture: value }));
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('Email déjà utilisé');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('Email invalide');
      }
    });
}
