import {Workout} from '$lib/Workout';
import type {PageLoad} from './$types';

export const load = (async () => {
	const workouts = await Workout.allWorkouts();
	// This delay is necessary to compute total workout times.
	await new Promise((res) => setTimeout(res, 1000));
	// Alternatively this would accomplish the same thing but increases network usage.
	// await Exercise.allExercises();
	return {
		workouts,
	};
}) satisfies PageLoad;
