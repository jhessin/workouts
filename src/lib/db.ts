import {
	addDoc,
	collection,
	CollectionReference,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	setDoc,
} from 'firebase/firestore';
import {get_store_value} from 'svelte/internal';
import {init, user} from './firebase';

export interface Exercise {
	id?: string;
	name: string;
	description?: string;
	videoUrl?: string;
}

function exerciseRef(): CollectionReference {
	const {db} = init();
	const userData = get_store_value(user);
	if (!userData || !db)
		throw new Error('User not logged in or Database not initialized');

	return collection(db, `users/${userData.uid}/exercises`);
}

export async function getExercises(): Promise<Exercise[]> {
	const snapshot = await getDocs(exerciseRef());

	const docs: Exercise[] = [];
	snapshot.forEach((exercise) => {
		docs.push({...exercise.data(), id: exercise.id} as Exercise);
	});
	return docs;
}

export async function getExercise(id: string): Promise<Exercise> {
	const exercise = await getDoc(doc(exerciseRef(), id));
	return {...exercise.data(), id} as Exercise;
}

export async function saveExercise(data: Exercise) {
	const ref = exerciseRef();
	await setDoc(doc(ref, data.id), data, {merge: true});
}

export async function newExercise(data: Exercise) {
	const ref = exerciseRef();
	await addDoc(ref, data);
}

export async function deleteExercise(name: string) {
	const ref = exerciseRef();
	await deleteDoc(doc(ref, name));
}
