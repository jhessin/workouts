<script lang="ts">
	import {getExercises} from '$lib/db';
	import Button from 'comp/Button.svelte';

	let promise = getExercises();
</script>

<Button href="/exercises/new">New Exercise</Button>

<ul>
	{#await promise}
		<h1 class="loading">Loading exercises</h1>
	{:then exercises}
		{#each exercises as exercise, index (index)}
			<li>
				<div class="left">
					{exercise.name}
					<br />
					<Button href="/exercises/edit/{exercise.id}">edit</Button>
				</div>
				<div class="right">
					{exercise.description}
				</div>
			</li>
		{/each}
	{/await}
</ul>

<style>
	li:first-child {
		border-top-style: solid;
	}

	li:last-child {
		border-bottom-style: solid;
	}

	li {
		list-style: none;
		overflow: auto;
		border: 1px dotted white;
		border-right-style: solid;
		border-left-style: solid;
	}

	li .left {
		float: left;
	}

	li .right {
		float: right;
		max-width: 50%;
	}
</style>
