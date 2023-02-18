import {getExercise} from '$lib/db';
import type {PageLoad} from './$types';

export const load = (async ({params}) => {
	const exercise = await getExercise(params.name);
	return exercise;
}) satisfies PageLoad;
