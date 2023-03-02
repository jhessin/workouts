<script lang="ts">
	import {goto} from '$app/navigation';
	import {Exercise, ExerciseSet} from '$lib/Workout';
	import Button from 'comp/Button.svelte';
	import type {PageData} from './$types';

	export let data: PageData;

	let {workout} = data;

	let {id, name, sets} = workout;
	const exercisePromise = Exercise.allExercises();
	let newExerciseId: string;
	let newTime: number = 20;
	if (sets.length === 0) sets = [new ExerciseSet()];
	let setIndex: number;
	setIndex = sets.length - 1;

	async function exerciseName(id: string = ''): Promise<String> {
		const exercise = await Exercise.fromDB(id);
		return exercise.name;
	}

	async function submitForm() {
		if (!name) return;
		workout.name = name;
		workout.sets = sets;
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
		{#each sets as set, currentSetIndex (currentSetIndex)}
			<li>
				<input
					type="radio"
					bind:group={setIndex}
					name="setIndex"
					value={currentSetIndex}
				/>
				<label for="set{currentSetIndex}">
					Set {currentSetIndex + 1} Repeat:
				</label>
				<input
					inputmode="numeric"
					type="number"
					bind:value={set.repeat}
				/>
				<Button
					form
					danger
					on:click={() =>
						(sets = sets.filter((_, index) => index !== currentSetIndex))}
					value="Delete Set"
				/>
				<ul>
					{#each set.exercises as ex, index (index)}
						<li>
							{#await exerciseName(ex.id)}
								<label for="ex{ex.id}">{ex.id}</label>
								<label for="time{ex.id}">{ex.time}</label>
							{:then name}
								<label for="ex{ex.id}">{name}</label>
								<label for="time{ex.id}">{ex.time}</label>
								<Button
									form
									danger
									on:click={async () => {
										sets[currentSetIndex].exercises = sets[
											currentSetIndex
										].exercises.filter((exercise) => ex.id !== exercise.id);
									}}
									value="Delete from workout"
								/>
							{/await}
						</li>
					{/each}
				</ul>
			</li>
		{/each}
		<Button
			on:click={() => (sets = [...sets, new ExerciseSet()])}
			value="New Set"
		/>
	</ul>

	{#await exercisePromise}
		<p>Loading Exercises...</p>
	{:then allExercises}
		<form
			on:submit|preventDefault={async () => {
				sets[setIndex].exercises = [
					...sets[setIndex].exercises,
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

	<Button
		submit
		value="Save"
	/>
	<Button
		form
		danger
		on:click={async () => {
			await workout.rm();
			goto('/workouts');
		}}
		value="Delete"
	/>
</form>

<style>
	.danger {
		background-color: red;
	}
</style>
