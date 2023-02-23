<script lang="ts">
	import {getExercises, getWorkouts} from '$lib/db';

	const exercisePromise = getExercises();
	const workoutPromise = getWorkouts();
</script>

<a href="/workouts/new">New Workout</a>

<ul>
	{#await workoutPromise}
		<h1 class="loading">Loading Workouts</h1>
	{:then workouts}
		{#each workouts as workout (workout.id)}
			<li>
				<div class="left">
					{workout.name}
					<br />
					<a href="/workouts/edit/{workout.id}">edit</a>
				</div>
				<div class="right">
					{workout.exercises.length} Exercises
				</div>
			</li>
		{/each}
	{/await}
</ul>
