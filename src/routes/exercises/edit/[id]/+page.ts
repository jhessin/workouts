import {Exercise} from '$lib/Workout';
import type {PageLoad} from './$types';

export const load = (async ({params}) => {
	const exercise = await Exercise.fromDB(params.id);
	return {
		exercise,
	};
}) satisfies PageLoad;
