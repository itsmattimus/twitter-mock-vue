import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "APIKEY",
    authDomain: "AUTH DOMAIN",
    databaseURL: "DBURL",
    projectId: "PROJECTID",
    storageBucket: "STORAGEBUCKET",
    messagingSenderId: "MESSAGINGSENDERID",
    appId: "APPID",
    measurementId: "MEASUREMENT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//utils
const db = firebase.firestore();
const auth = firebase.auth();

//collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')
const friendsCollection = db.collection('friends')
const messageCollection = db.collection('messages')

//export utilis/refs
export {
    db,
    auth,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection,
    friendsCollection,
    messageCollection
}




