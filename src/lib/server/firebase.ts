// Import the functions you need from the SDKs you need
import {FIREBASE_API_KEY} from '$env/static/private';
import {getAnalytics} from 'firebase/analytics';
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: 'work-n-out.firebaseapp.com',
	projectId: 'work-n-out',
	storageBucket: 'work-n-out.appspot.com',
	messagingSenderId: '807791503978',
	appId: '1:807791503978:web:12b1db6cd2b9e9e4caf813',
	measurementId: 'G-0KTPRX21EP',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
