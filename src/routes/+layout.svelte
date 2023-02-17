<script lang="ts">
	import {init, user} from '$lib/firebase';
	import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
	import {quintOut} from 'svelte/easing';
	import {slide} from 'svelte/transition';
	import type {PageServerData} from './$types';

	export let data: PageServerData;

	const {app, db, auth} = init(data.firebaseConfig);

	let sidebar: HTMLDivElement;
	let showSidebar = false;
</script>

{#if showSidebar}
	<div
		transition:slide={{delay: 250, duration: 1000, easing: quintOut}}
		style="width: 250px;"
		bind:this={sidebar}
	>
		<button on:click={() => (showSidebar = false)}>&times</button>
		{#if !$user}
			<button
				on:click={() => {
					signInWithPopup(auth, new GoogleAuthProvider());
				}}
			>
				Sign in with Google
			</button>
		{:else}
			<button
				on:click={() => {
					auth.signOut();
				}}
			>
				Sign Out
			</button>
		{/if}
	</div>
{/if}
<button on:click={() => (showSidebar = true)}>&#9776;</button>

<div>
	<slot><!-- optional fallback --></slot>
</div>
