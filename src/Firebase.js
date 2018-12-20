import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyCEzK0X3z74IQa3qUddC-VVYOVifNXEl7M",
    authDomain: "psevdoslack.firebaseapp.com",
    databaseURL: "https://psevdoslack.firebaseio.com",
    projectId: "psevdoslack",
    storageBucket: "psevdoslack.appspot.com",
    messagingSenderId: "187159024355"
  };
  firebase.initializeApp(config);

export default firebase;