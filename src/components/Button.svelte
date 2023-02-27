<script lang="ts">
	export let href: string = '#';
	export let button: boolean = false;
	export let submit: boolean = false;
	export let form: boolean = false;
	export let value: string = '';
</script>

{#if button}
	<button on:click>
		<slot>{value}</slot>
	</button>
{:else if submit}
	<input
		type="submit"
		on:click
		{value}
	/>
{:else if form}
	<input
		type="button"
		on:click
		{value}
	/>
{:else}
	<a
		{href}
		on:click
	>
		<slot>{value}</slot>
	</a>
{/if}

<style>
	button,
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
	a:hover,
	a:active {
		background-color: rgb(9, 129, 15);
	}
</style>
