import Firebase from 'firebase';

var firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: "https://profile-chatbot-6a3b0-default-rtdb.firebaseio.com",
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
};

// Initialize Firebase
Firebase.initializeApp(firebaseConfig);



const database = Firebase.database();

export default database;