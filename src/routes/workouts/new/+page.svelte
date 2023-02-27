<script lang="ts">
	import {goto} from '$app/navigation';
	import {Workout} from '$lib/Workout';

	let name: string = '';
</script>

<form
	on:submit|preventDefault={async () => {
		if (!name) return;
		const workout = await Workout.new(name);
		goto('/workouts');
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
