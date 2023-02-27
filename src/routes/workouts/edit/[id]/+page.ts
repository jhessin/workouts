import {Workout} from '$lib/Workout';
import type {PageLoad} from './$types';

export const load = (async ({params}) => {
	const workout = await Workout.fromDB(params.id);
	console.log(JSON.stringify(workout));
	return {
		workout,
	};
}) satisfies PageLoad;
