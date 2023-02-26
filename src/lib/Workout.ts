/**
 * This file encompasses all types and classes to be used to embody a workout.
 *
 * The smallest object is a simple exercise which has an id, name, and description.
 *
 * This evolves into a TimedExercise which is an exercise with a time associated with it.
 *
 * Also notable is an ExerciseSet with is a group of exercises that can be stored in copy and paste fashion and run through workouts.
 *
 * Finally a workout is created with an array of TimedExercises. These are run through to create the final workout.
 */

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

export interface iExercise {
	id?: string;
	name: string;
	description?: string;
}

export class Exercise implements iExercise {
	_id?: string;
	name: string;
	description?: string;

	public get id(): string | undefined {
		if (this._id) return this._id;
		addDoc(exerciseRef(), this.data).then((ref) => (this._id = ref.id));
	}

	constructor(name: string, description = '') {
		this.name = name;
		this.description = description;
	}

	public get data(): iExercise {
		return {
			name: this.name,
			description: this.description,
		};
	}

	public save() {
		if (this.id) {
			setDoc(doc(exerciseRef(), this.id), this.data, {merge: true});
		}
	}

	public static fromData(data: iExercise): Exercise {
		const e = new Exercise(data.name, data.description);
		e._id = data.id;
		return e;
	}

	public static async fromDB(id: string): Promise<Exercise> {
		const data = await getDoc(doc(exerciseRef(), id));
		return Exercise.fromData(data.data() as iExercise);
	}

	public async rm() {
		await deleteDoc(doc(exerciseRef(), this._id));
	}

	public static async allExercises(): Promise<Exercise[]> {
		const snapshot = await getDocs(exerciseRef());

		const docs: Exercise[] = [];
		snapshot.forEach((exercise) => {
			docs.push(Exercise.fromData(exercise.data() as iExercise));
		});
		return docs.sort((a, b) => {
			if (a.name < b.name) return -1;
			if (a.name === b.name) return 0;
			return 1;
		});
	}
}

export interface iTimedExercise {
	/** The id of the exercise */
	id?: string;
	/** The time (in seconds) the exercise should be performed */
	time: number;
}

export class TimedExercise extends Exercise implements iTimedExercise {
	time: number;

	constructor(name: string, description = '', time = 20) {
		super(name, description);
		this.time = time;
	}
}

export interface iExerciseSet {
	exercises: iTimedExercise[];
}

export class ExerciseSet implements iExerciseSet {
	exercises: iTimedExercise[] = [];
}

export interface iWorkout {
	id?: string;
	name: string;
	exercises: iTimedExercise[];
}

export class Workout extends ExerciseSet implements iWorkout {
	_id?: string | undefined;
	name: string;

	constructor(name: string, exercises: iTimedExercise[] = []) {
		super();
		this.name = name;
		this.exercises = exercises;
	}

	public get data(): iWorkout {
		return {
			name: this.name,
			exercises: this.exercises,
		};
	}

	public get id(): string | undefined {
		if (this._id) return this._id;
		addDoc(workoutRef(), this.data).then((ref) => (this._id = ref.id));
	}

	public save() {
		if (this.id) {
			setDoc(doc(workoutRef(), this.id), this.data, {merge: true});
		}
	}

	public static fromData(data: iWorkout): Workout {
		const e = new Workout(data.name, data.exercises);
		e._id = data.id;
		return e;
	}

	public static async fromDB(id: string): Promise<Workout> {
		const data = await getDoc(doc(workoutRef(), id));
		return Workout.fromData(data.data() as iWorkout);
	}

	public async rm() {
		await deleteDoc(doc(workoutRef(), this._id));
	}

	public static async allWorkouts(): Promise<Workout[]> {
		const snapshot = await getDocs(workoutRef());

		const docs: Workout[] = [];
		snapshot.forEach((workout) => {
			// docs.push({...workout.data(), id: workout.id} as Workout);
			docs.push(Workout.fromData(workout.data() as iWorkout));
		});
		return docs;
	}
}
