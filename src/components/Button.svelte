<script lang="ts">
	export let href: string = '#';
	export let button: boolean = false;
	export let submit: boolean = false;
	export let form: boolean = false;
	export let value: string = '';
	export let danger: boolean = false;
</script>

{#if button}
	<button
		on:click|preventDefault
		class:danger
	>
		<slot>{value}</slot>
	</button>
{:else if submit}
	<input
		class:danger
		type="submit"
		on:click
		{value}
	/>
{:else if form}
	<input
		class:danger
		type="button"
		on:click|preventDefault
		{value}
	/>
{:else}
	<a
		class:danger
		{href}
		on:click
	>
		<slot>{value}</slot>
	</a>
{/if}

<style>
	button,
	input,
	a:link,
	a:visited {
		background-color: rgba(9, 129, 15, 0.25);
		color: white;
		padding: 4px 5px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
	}

	button:active,
	input,
	a:hover,
	a:active {
		background-color: rgb(9, 129, 15);
	}

	.danger {
		background-color: red;
	}
</style>
