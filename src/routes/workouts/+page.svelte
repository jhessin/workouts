<script lang="ts">
	import type {Workout} from '$lib/Workout';
	import Button from 'comp/Button.svelte';
	import type {PageData} from './$types';

	export let data: PageData;
	const {workouts} = data;

	function getWorkoutTime(workout: Workout): string {
		const totalSeconds = workout.totalTime;
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	}
</script>

<Button href="/workouts/new">New Workout</Button>

<ul>
	{#each workouts as workout (workout.id)}
		<li>
			<div class="left">
				{workout.name}
				<br />
				<Button href="/workouts/edit/{workout.id}">Edit</Button>
				<Button href="/workouts/play/{workout.id}">Play</Button>
			</div>
			<div class="right">
				{getWorkoutTime(workout)}
			</div>
		</li>
	{/each}
</ul>
