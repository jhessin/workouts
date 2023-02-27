<script lang="ts">
	import {goto} from '$app/navigation';
	import type {PageData} from './$types';

	export let data: PageData;

	let {exercise} = data;
	let name: string = exercise.name;
	let description = exercise.description;
</script>

<form
	on:submit|preventDefault={async () => {
		if (!name) return;
		exercise.name = name;
		exercise.description = description;
		await exercise.save();
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

	<label for="description">Description</label>
	<input
		inputmode="text"
		name="description"
		bind:value={description}
	/>

	<button type="submit">Save</button>
	<button
		class="danger"
		on:click|preventDefault={async () => {
			await exercise.rm();
			goto('/exercises');
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
