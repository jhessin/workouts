<script lang="ts">
	import {goto} from '$app/navigation';
	import {Exercise} from '$lib/Workout';

	let name: string = '';
	let description: string = '';
</script>

<form
	on:submit|preventDefault={async () => {
		if (!name) return;
		const exercise = await Exercise.new(name, description);
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
</form>
