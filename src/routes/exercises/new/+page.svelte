<script lang="ts">
	import {goto} from '$app/navigation';
	import {newExercise} from '$lib/db';

	let name: string = '';
	let description: string = '';
	let videoUrl: string = '';
</script>

<form
	on:submit|preventDefault={() => {
		if (!name) return;
		newExercise({
			name,
			description,
			videoUrl,
		}).then(() => goto('/exercises'));
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
</form>
