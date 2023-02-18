<script lang="ts">
	import {page} from '$app/stores';
	import {init, user} from '$lib/firebase';
	import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
	import {quintOut} from 'svelte/easing';
	import {slide} from 'svelte/transition';

	const {auth} = init();
</script>

<!-- {@debug $page} -->

<nav transition:slide={{delay: 250, duration: 1000, easing: quintOut}}>
	<ul>
		{#if !$user}
			<li>
				<a
					class="sign-in-button button"
					href={$page.url.toString()}
					on:click={() => {
						signInWithPopup(auth, new GoogleAuthProvider());
					}}
				>
					Sign in with Google
				</a>
			</li>
		{:else}
			<li>
				<a
					href="/"
					class:active={$page.url.pathname === '/'}
				>
					Home
				</a>
			</li>
			<li>
				<a
					href="/exercises"
					class:active={$page.url.pathname.startsWith('/exercises')}
				>
					Exercises
				</a>
			</li>
			<li>
				<a
					href="/workouts"
					class:active={$page.url.pathname.startsWith('/workouts')}
				>
					Workouts
				</a>
			</li>
			<li>
				<a
					class="sign-out-button button"
					href="/"
					on:click={() => {
						auth.signOut();
					}}
				>
					Sign Out
				</a>
			</li>
		{/if}
	</ul>
</nav>

<style>
	nav {
		width: 100%;
		text-align: center;
		font-size: 1.1rem;
		font-weight: lighter;
		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
	}

	nav ul {
		margin: 0;
		/* overflow: auto; */
	}

	nav li {
		display: inline;
		padding: 0 5%;
	}

	nav a {
		display: inline-block;
		padding: 0.5rem;
		color: white;
		text-decoration: none;
	}

	nav a:hover {
		background-color: rgba(255, 255, 255, 0.3);
	}

	.button {
		position: right;
	}

	.active {
		background-color: midnightblue;
	}

	/* .sign-out-button {
		background-color: red;
	}

	.sign-in-button {
		background-color: green;
	} */
</style>
