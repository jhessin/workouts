import {Exercise, Workout} from '$lib/Workout';
import type {PageLoad} from './$types';

export const load = (async ({params}) => {
	const workout = await Workout.fromDB(params.id);
	const exercises = await Exercise.allExercises();
	console.log(JSON.stringify(workout));
	return {
		workout,
		exercises,
	};
}) satisfies PageLoad;
