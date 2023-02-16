<script lang="ts">
	import {init, user} from '$lib/firebase';
	import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
	import 'w3-css/w3.css';
	import type {PageServerData} from './$types';

	export let data: PageServerData;

	const {app, db, auth} = init(data.firebaseConfig);
</script>

{#if !$user}
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
