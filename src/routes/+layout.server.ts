import {firebaseConfig} from '$lib/server/firebase';
import type {LayoutServerLoad} from './$types';

export const load: LayoutServerLoad = () => {
	return {
		firebaseConfig,
	};
};
