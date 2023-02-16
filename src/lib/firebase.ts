import {
	getApp,
	initializeApp,
	type FirebaseApp,
	type FirebaseOptions,
} from 'firebase/app';
import {
	getAuth,
	onAuthStateChanged,
	type Auth,
	type Unsubscribe,
	type User,
} from 'firebase/auth';
import {doc, getFirestore, setDoc, type Firestore} from 'firebase/firestore';
import {writable, type Writable} from 'svelte/store';

let app: FirebaseApp;
export const user: Writable<User | null> = writable();

interface iApp {
	app: FirebaseApp;
	auth: Auth;
	db: Firestore;
}

let unsub: Unsubscribe | undefined;

/**
 * init is used to wrap firebase initialization.
 *
 * @param config The FirebaseOptions to initialize an app with if necessary.
 * @returns A wrapper for the firebase app and all other firebase resources.
 */
export function init(config: FirebaseOptions): iApp {
	try {
		app = getApp();
	} catch (error) {
		app = initializeApp(config);
	}
	const auth = getAuth(app);
	const db = getFirestore(app);

	if (!unsub) {
		unsub = onAuthStateChanged(auth, (newUser) => {
			user.set(newUser);
			if (!newUser) return;
			setDoc(doc(db, 'users', newUser.uid), {
				name: newUser.displayName,
				email: newUser.email,
				provider: newUser.providerData,
			});
		});
	}

	return {
		app,
		auth,
		db,
	};
}
