<script lang="ts">
	import {goto} from '$app/navigation';
	import {
		deleteWorkout,
		getExercise,
		getExercises,
		updateWorkout,
	} from '$lib/db';
	import type {PageData} from './$types';

	export let data: PageData;

	let id: string = data.id!;
	let name: string = data.name;
	let exercises = data.exercises;
	const exercisePromise = getExercises();
	let newExerciseId: string;
	let newTime: number;

	async function exerciseName(id: string): Promise<String> {
		const exercise = await getExercise(id);
		return exercise.name;
	}
</script>

<form
	on:submit|preventDefault={async () => {
		if (!name) return;
		await updateWorkout({
			id,
			name,
			exercises,
		});
		goto('/exercises');
	}}
>
	<label for="name">Exercise Name *</label>
	<input
		inputmode="text"
		name="name"
		id="exercise-name"
		bind:value={name}
	/>

	<br />

	{#each exercises as [exId, time] (exId[0])}
		{#await exerciseName(exId)}
			<label for="ex{exId}">{exId}</label>
			<label for="time{exId}">{time}</label>
		{:then exercise}
			<label for="ex{exId}">{exercise}</label>
			<label for="time{exId}">{time}</label>
			<input
				type="button"
				id="ex{exId}"
				class="danger"
				on:click|preventDefault={async () => {
					exercises = exercises.filter(([innerId, time]) => innerId !== exId);
				}}
				value="Delete from workout"
			/>
		{/await}
	{/each}

	{#await exercisePromise}
		<p>Loading Exercises...</p>
	{:then allExercises}
		<label for="exercise">Choose an exercise to add</label>
		<select
			id="exercise"
			name="exercise"
			bind:value={newExerciseId}
		>
			<option value="">Rest</option>
			{#each allExercises as exercise (exercise.id)}
				<option value="exercise.id">{exercise.name}</option>
			{/each}
		</select>

		<label for="time">How long (in seconds)?</label>
		<input
			inputmode="numeric"
			type="number"
			bind:value={newTime}
		/>

		<input
			type="button"
			value="save"
			on:click={async () => {
				exercises = [...exercises, [newExerciseId, newTime]];
				newExerciseId = '';
				newTime = 20;
			}}
		/>
	{/await}

	<button type="submit">Save</button>
	<button
		class="danger"
		on:click|preventDefault={async () => {
			await deleteWorkout(id);
			goto('/workouts');
		}}
	>
		Delete
	</button>
</form>

<style>
	.danger {
		background-color: red;
	}
</style>
