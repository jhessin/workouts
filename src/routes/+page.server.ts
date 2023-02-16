import {firebaseConfig} from '$lib/server/firebase';
import type {PageServerLoad} from './$types';

export const load: PageServerLoad = (event) => {
	return {
		firebaseConfig,
	};
};
