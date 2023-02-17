<script lang="ts">
	import Heading from './Heading.svelte';
	import Navbar from './Navbar.svelte';

	let sidebar: HTMLDivElement;
	let showSidebar = true;
</script>

<!-- {#if showSidebar} -->
<header class="main-header">
	<Navbar />
	<Heading />
</header>
<!-- {/if} -->
<!-- <button on:click={() => (showSidebar = !showSidebar)}>&#9776;</button> -->

<section class="content-section container">
	<slot><!-- optional fallback --></slot>
</section>

<style>
	.content-section {
		margin: 1rem;
	}

	.container {
		max-width: 900px;
		margin: 0 auto;
	}
</style>
