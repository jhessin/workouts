<script lang="ts">
	import {getExercises} from '$lib/db';

	let promise = getExercises();
</script>

<a href="/exercises/new">+</a>

<ul>
	{#await promise}
		<h1 class="loading">Loading exercises</h1>
	{:then exercises}
		{#each exercises as exercise (exercise.name)}
			<li>
				{exercise.name}
				<a href="/exercises/edit/{exercise.name}">edit</a>
			</li>
		{/each}
	{/await}
</ul>

<style>
	li {
		list-style: none;
	}
</style>
