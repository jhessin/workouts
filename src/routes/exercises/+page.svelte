<script lang="ts">
	import {getExercises} from '$lib/db';

	let promise = getExercises();
</script>

<a href="/exercises/new">New Exercise</a>

<ul>
	{#await promise}
		<h1 class="loading">Loading exercises</h1>
	{:then exercises}
		{#each exercises as exercise (exercise.id)}
			<li>
				<div class="left">
					{exercise.name}
					<br />
					<a href="/exercises/edit/{exercise.id}">edit</a>
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

	li .left {
		float: left;
	}

	li .right {
		float: right;
		max-width: 50%;
	}
</style>
