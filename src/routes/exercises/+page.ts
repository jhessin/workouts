import {Exercise} from '$lib/Workout';
import type {PageLoad} from './$types';

export const load: PageLoad = async () => {
	const exercises = await Exercise.allExercises();
	return {
		exercises,
	};
};
