import {getWorkout} from '$lib/db';
import type {PageLoad} from './$types';

export const load = (async ({params}) => {
	const workout = await getWorkout(params.id);
	console.log(JSON.stringify(workout));
	return workout;
}) satisfies PageLoad;
