<script lang="ts">
	import {init, user} from '$lib/firebase';
	import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
	import {onMount} from 'svelte';
	import {quintOut} from 'svelte/easing';
	import {slide} from 'svelte/transition';
	import 'w3-css/w3.css';
	import type {PageServerData} from './$types';

	export let data: PageServerData;

	const {app, db, auth} = init(data.firebaseConfig);

	let sidebar: HTMLDivElement;
	let showSidebar = false;
	let alwaysShowSidebar: boolean = false;
	onMount(() => {
		alwaysShowSidebar = window.innerWidth >= 640;
	});
</script>

<main>
	{#if showSidebar || alwaysShowSidebar}
		<div
			class="w3-sidebar w3-bar-block w3-collapse w3-card w3-mobile"
			transition:slide={{delay: 250, duration: 1000, easing: quintOut}}
			style="width: 250px;"
			bind:this={sidebar}
		>
			{#if !alwaysShowSidebar}
				<button
					class="w3-button w3-display-topright w3-xlarge"
					on:click={() => (showSidebar = false)}
				>
					&times
				</button>
			{/if}
			{#if !$user}
				<button
					class="w3-button w3-green w3-bar-item"
					on:click={() => {
						signInWithPopup(auth, new GoogleAuthProvider());
					}}
				>
					Sign in with Google
				</button>
			{:else}
				<button
					class="w3-button w3-red w3-bar-item"
					on:click={() => {
						auth.signOut();
					}}
				>
					Sign Out
				</button>
			{/if}
		</div>
	{/if}
	<button
		class="w3-button w3-xlarge"
		on:click={() => (showSidebar = true)}
	>
		&#9776;
	</button>

	<div class="w3-main w3-content">
		<slot><!-- optional fallback --></slot>
	</div>
</main>
