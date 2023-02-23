<script lang="ts">
	import {getWorkouts, type Workout} from '$lib/db';
	import Button from 'comp/Button.svelte';

	const workoutPromise = getWorkouts();

	function getWorkoutTime(workout: Workout): string {
		const totalSeconds = workout.exercises
			.map((obj) => Object.values(obj)[0])
			.reduce((partialSum, a) => partialSum + a, 0);
		const minutes = totalSeconds / 60;
		const seconds = totalSeconds % 60;
		return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	}
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
					{getWorkoutTime(workout)}
				</div>
			</li>
		{/each}
	{/await}
</ul>
