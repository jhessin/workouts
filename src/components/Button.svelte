<script lang="ts">
	export let href: string;
</script>

<a
	{href}
	on:message
>
	<slot />
</a>

<style>
	a:link,
	a:visited {
		background-color: rgba(9, 129, 15, 0.25);
		color: white;
		padding: 4px 5px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
	}

	a:hover,
	a:active {
		background-color: rgb(9, 129, 15);
	}
</style>
