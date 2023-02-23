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

export const Rest: Exercise = {
	id: '',
	name: 'Rest',
	description: 'Take a breather.',
};

export interface Workout {
	id?: string;
	name: string;
	exercises: [string, number][];
}

function exerciseRef(): CollectionReference {
	const {db} = init();
	const userData = get_store_value(user);
	if (!userData || !db)
		throw new Error('User not logged in or Database not initialized');

	return collection(db, `users/${userData.uid}/exercises`);
}

function workoutRef(): CollectionReference {
	const {db} = init();
	const userData = get_store_value(user);
	if (!userData || !db)
		throw new Error('User not logged in or Database not initialized');

	return collection(db, `users/${userData.uid}/workouts`);
}

export async function getExercises(): Promise<Exercise[]> {
	const snapshot = await getDocs(exerciseRef());

	const docs: Exercise[] = [];
	snapshot.forEach((exercise) => {
		docs.push({...exercise.data(), id: exercise.id} as Exercise);
	});
	return docs;
}

export async function getWorkouts(): Promise<Workout[]> {
	const snapshot = await getDocs(workoutRef());

	const docs: Workout[] = [];
	snapshot.forEach((workout) => {
		docs.push({...workout.data(), id: workout.id} as Workout);
	});
	return docs;
}

export async function getExercise(id: string): Promise<Exercise> {
	if (id === '') return Rest;
	const exercise = await getDoc(doc(exerciseRef(), id));
	return {...exercise.data(), id} as Exercise;
}

export async function getWorkout(id: string): Promise<Workout> {
	const workout = await getDoc(doc(workoutRef(), id));
	return {...workout.data(), id} as Workout;
}

export async function newExercise(data: Exercise) {
	const ref = exerciseRef();
	await addDoc(ref, data);
}

export async function newWorkout(data: Workout) {
	const ref = workoutRef();
	await addDoc(ref, data);
}

export async function updateExercise(data: Exercise) {
	const ref = exerciseRef();
	await setDoc(doc(ref, data.id), data, {merge: true});
}

export async function updateWorkout(data: Workout) {
	const ref = workoutRef();
	await setDoc(doc(ref, data.id), data, {merge: true});
}

export async function deleteExercise(name: string) {
	const ref = exerciseRef();
	await deleteDoc(doc(ref, name));
}

export async function deleteWorkout(name: string) {
	const ref = workoutRef();
	await deleteDoc(doc(ref, name));
}
