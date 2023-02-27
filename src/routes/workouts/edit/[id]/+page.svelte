<script lang="ts">
	import {goto} from '$app/navigation';
	import {Exercise} from '$lib/Workout';
	import type {PageData} from './$types';

	export let data: PageData;

	let {workout} = data;

	let {id, name, exercises} = workout;
	const exercisePromise = Exercise.allExercises();
	let newExerciseId: string;
	let newTime: number = 20;

	async function exerciseName(id: string = ''): Promise<String> {
		const exercise = await Exercise.fromDB(id);
		return exercise.name;
	}

	async function submitForm() {
		if (!name) return;
		workout.name = name;
		workout.exercises = exercises;
		await workout.save();
		goto('/workouts');
	}
</script>

<form on:submit|preventDefault={submitForm}>
	<label for="name">Workout Name *</label>
	<input
		inputmode="text"
		name="name"
		id="exercise-name"
		bind:value={name}
	/>

	<br />

	<ul>
		{#each exercises as ex, index (index)}
			<li>
				{#await exerciseName(ex.id)}
					<label for="ex{ex.id}">{ex.id}</label>
					<label for="time{ex.id}">{ex.time}</label>
				{:then name}
					<label for="ex{ex.id}">{name}</label>
					<label for="time{ex.id}">{ex.time}</label>
					<input
						type="button"
						id="ex{ex.id}"
						class="danger"
						on:click|preventDefault={async () => {
							exercises = exercises.filter((exercise) => ex.id !== exercise.id);
						}}
						value="Delete from workout"
					/>
				{/await}
			</li>
		{/each}
	</ul>

	{#await exercisePromise}
		<p>Loading Exercises...</p>
	{:then allExercises}
		<form
			on:submit|preventDefault={async () => {
				exercises = [
					...exercises,
					{
						id: newExerciseId,
						time: newTime,
					},
				];
				newExerciseId = '';
				newTime = 20;
			}}
		>
			<label for="exercise">Choose an exercise to add</label>
			<select
				id="exercise"
				name="exercise"
				bind:value={newExerciseId}
			>
				{#each allExercises as exercise (exercise.id)}
					<option value={exercise.id}>{exercise.name}</option>
				{/each}
			</select>

			<label for="time">How long (in seconds)?</label>
			<input
				inputmode="numeric"
				type="number"
				bind:value={newTime}
			/>

			<input
				type="submit"
				value="save"
			/>
		</form>
	{/await}

	<button type="submit">Save</button>
	<button
		class="danger"
		on:click|preventDefault={async () => {
			await workout.rm();
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
