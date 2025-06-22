import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, getDocs, collection, setDoc, deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAWXSu1qo_d8FQO0eGId4C3Pj_sLR3jRok",
//     authDomain: "data-center-ed5d5.firebaseapp.com",
//     projectId: "data-center-ed5d5",
//     storageBucket: "data-center-ed5d5.firebasestorage.app",
//     messagingSenderId: "960718946790",
//     appId: "1:960718946790:web:6e73fb2b709f2be131d627",
//     measurementId: "G-DZGFPRLJP5"
// };
const firebaseConfig = {
    apiKey: "AIzaSyB41svdnDLDUDTotvn8N0TVfVeNWgG9ypk",
    authDomain: "base-datos-iot-50cb4.firebaseapp.com",
    databaseURL: "https://base-datos-iot-50cb4-default-rtdb.firebaseio.com",
    projectId: "base-datos-iot-50cb4",
    storageBucket: "base-datos-iot-50cb4.firebasestorage.app",
    messagingSenderId: "522493704609",
    appId: "1:522493704609:web:13686733b75bdb9f7c73e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, collection, setDoc, deleteDoc, getDocs };