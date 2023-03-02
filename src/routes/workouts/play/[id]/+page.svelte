<script lang="ts">
	import type {PageData} from './$types';

	export let data: PageData;
	const {workout} = data;
	const totalTime = workout.totalTime;
	let currentTime = 0;
</script>

<h1>This will be the player</h1>
