<script lang="ts">
	import {goto} from '$app/navigation';
	import {deleteExercise, saveExercise} from '$lib/db';
	import type {PageData} from './$types';

	export let data: PageData;

	let id: string = data.id!;
	let name: string = data.name;
	let description = data.description;
	let videoUrl = data.videoUrl;
</script>

<form
	on:submit|preventDefault={async () => {
		if (!name) return;
		await saveExercise({
			id,
			name,
			description,
			videoUrl,
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

	<label for="videoUrl">Video URL</label>
	<input
		inputmode="url"
		name="videoUrl"
		bind:value={videoUrl}
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
			await deleteExercise(id);
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
