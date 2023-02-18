import {getExercise} from '$lib/db';
import type {PageLoad} from './$types';

export const load = (async ({params}) => {
	const exercise = await getExercise(params.id);
	console.log(JSON.stringify(exercise));
	return exercise;
}) satisfies PageLoad;
