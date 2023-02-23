<script lang="ts">
	import {goto} from '$app/navigation';
	import {
		deleteWorkout,
		getExercise,
		getExercises,
		updateWorkout,
		type TimedExercise,
	} from '$lib/db';
	import type {PageData} from './$types';

	export let data: PageData;

	let id: string = data.id!;
	let name: string = data.name;
	let exercises: [string, number][] = data.exercises.map((obj) => {
		let id = Object.keys(obj)[0];
		let time = obj[id];
		return [id, time];
	});
	const exercisePromise = getExercises();
	let newExerciseId: string;
	let newTime: number = 20;

	async function exerciseName(id: string): Promise<String> {
		const exercise = await getExercise(id);
		return exercise.name;
	}
	async function submitForm() {
		if (!name) return;
		await updateWorkout({
			id,
			name,
			exercises: exercises.map(([id, time]) => {
				let temp: TimedExercise = {};
				temp[id] = time;
				return temp;
			}),
		});
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
		{#each exercises as [exId, time], index (index)}
			<li>
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
							exercises = exercises.filter(
								([innerId, time]) => innerId !== exId,
							);
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
			on:submit|preventDefault={() => {
				exercises = [...exercises, [newExerciseId, newTime]];
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
