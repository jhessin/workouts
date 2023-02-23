<script lang="ts">
	import {goto} from '$app/navigation';
	import {newWorkout} from '$lib/db';

	let name: string = '';
</script>

<form
	on:submit|preventDefault={() => {
		if (!name) return;
		newWorkout({
			name,
			exercises: [],
		}).then(() => goto('/workouts'));
	}}
>
	<label for="name">Workout Name *</label>
	<input
		inputmode="text"
		name="name"
		id="name"
		bind:value={name}
	/>

	<button type="submit">Save</button>
</form>
