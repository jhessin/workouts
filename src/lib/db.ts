import {
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
	snapshot.forEach((doc) => {
		docs.push(doc.data() as Exercise);
	});
	return docs;
}

export async function getExercise(name: string): Promise<Exercise> {
	const exercise = await getDoc(doc(exerciseRef(), name));
	return exercise.data() as Exercise;
}

export async function saveExercise(data: Exercise) {
	setDoc(doc(exerciseRef(), data.name), data, {merge: true});
}

export async function deleteExercise(name: string) {
	deleteDoc(doc(exerciseRef(), name));
}
