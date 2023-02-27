<script lang="ts">
	import {Workout} from '$lib/Workout';
	import Button from 'comp/Button.svelte';

	const workoutPromise = Workout.allWorkouts();

	function getWorkoutTime(workout: Workout): string {
		const totalSeconds = workout.totalTime;
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
