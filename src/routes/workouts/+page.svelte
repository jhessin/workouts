<script lang="ts">
	import {getWorkouts} from '$lib/db';
	import Button from 'comp/Button.svelte';

	const workoutPromise = getWorkouts();
</script>

<Button href="/workouts/new">New Workout</Button>

<ul>
	{#await workoutPromise}
		<h1 class="loading">Loading Workouts</h1>
	{:then workouts}
		{#each workouts as workout (workout.id)}
			<li>
				<div class="left">
					{workout.name}
					<br />
					<Button href="/workouts/edit/{workout.id}">edit</Button>
				</div>
				<div class="right">
					{workout.exercises.length} Exercises
				</div>
			</li>
		{/each}
	{/await}
</ul>
