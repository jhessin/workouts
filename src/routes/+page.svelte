<script lang="ts">
	import {initializeApp} from 'firebase/app';
	import {
		getAuth,
		GoogleAuthProvider,
		onAuthStateChanged,
		signInWithPopup,
		type User,
	} from 'firebase/auth';
	import {
		doc,
		DocumentReference,
		getFirestore,
		setDoc,
	} from 'firebase/firestore';
	import 'w3-css/w3.css';
	import type {PageServerData} from './$types';

	export let data: PageServerData;

	const app = initializeApp(data.firebaseConfig);
	const db = getFirestore(app);
	const auth = getAuth(app);
	let user: User | null;

	// signInAnonymously(auth).then(async ({user}) => {
	// 	const userRef = doc(db, 'users', user.uid);
	// 	await setDoc(
	// 		userRef,
	// 		{
	// 			name: 'Anonymous',
	// 		},
	// 		{merge: true},
	// 	);
	// });

	function getRef(): DocumentReference | null {
		if (!user) return null;
		return doc(db, 'users', user.uid);
	}

	onAuthStateChanged(auth, async (newUser) => {
		user = newUser;
		if (!newUser) return;
		await setDoc(
			getRef()!,
			{
				name: newUser.displayName,
				email: newUser.email,
				provider: newUser.providerData,
			},
			// Use this to keep from overwritting data
			// {merge: true},
		);
	});
</script>

{#if !user}
	<button
		class="w3-button w3-green"
		on:click={() => {
			signInWithPopup(auth, new GoogleAuthProvider());
		}}
	>
		Sign in with Google
	</button>
{:else}
	<button
		class="w3-button w3-red"
		on:click={() => {
			auth.signOut();
		}}
	>
		Sign Out
	</button>
{/if}

<h1>Welcome to SvelteKit</h1>
<p>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a>
	to read the documentation
</p>
