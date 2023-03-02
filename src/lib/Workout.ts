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
	id: string;
	name: string;
	description?: string;
}

export class Exercise implements iExercise {
	_id: string;
	name: string;
	description?: string;
	selected = false;

	public get id(): string {
		return this._id;
	}

	private constructor(name: string, description: string | undefined) {
		this.name = name;
		this.description = description;
		// TODO - find a better way to do this.
		this._id = '';
	}

	public static async new(
		name: string,
		description: string | undefined,
	): Promise<Exercise> {
		const ex = new Exercise(name, description);
		const ref = await addDoc(exerciseRef(), ex.data);
		ex._id = ref.id;
		await setDoc(doc(exerciseRef(), ref.id), ex.data);
		return ex;
	}

	public get data(): iExercise {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
		};
	}

	public async save() {
		await setDoc(doc(exerciseRef(), this.id), this.data, {merge: true});
	}

	public static fromData(data: iExercise): Exercise {
		const e = new Exercise(data.name, data.description);
		e._id = data.id;
		return e;
	}

	public static async fromDB(id: string): Promise<Exercise> {
		const data = await getDoc(doc(exerciseRef(), id));
		const exercise = Exercise.fromData(data.data() as iExercise);
		exercise._id = id;
		return exercise;
	}

	public timed(time: number): iTimedExercise {
		return {
			id: this.id,
			time,
		};
	}

	public async rm() {
		await deleteDoc(doc(exerciseRef(), this.id));
	}

	public static async allExercises(): Promise<Exercise[]> {
		const snapshot = await getDocs(exerciseRef());

		const docs: Exercise[] = [];
		snapshot.forEach((exercise) => {
			const ex = Exercise.fromData(exercise.data() as iExercise);
			ex._id = exercise.id;
			// uncomment the following to update the Database.
			// ex.save();
			docs.push(ex);
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
	id: string;
	/** The time (in seconds) the exercise should be performed */
	time: number;
}

export interface iExerciseSet {
	exercises: iTimedExercise[];
	repeat: number;
}

export class ExerciseSet implements iExerciseSet {
	exercises: iTimedExercise[] = [];
	repeat = 1;

	constructor(
		data: iExerciseSet = {
			exercises: [],
			repeat: 1,
		},
	) {
		this.exercises = data.exercises;
		this.repeat = data.repeat;
	}

	public get data(): iExerciseSet {
		return {
			exercises: this.exercises,
			repeat: this.repeat,
		};
	}

	public get totalTime(): number {
		return this.exercises
			.map((ex) => ex.time)
			.reduce((partialSum, a) => partialSum + a, 0);
	}
}

export interface iWorkout {
	id: string;
	name: string;
	sets: iExerciseSet[];
}

export class Workout implements iWorkout {
	_id: string;
	name: string;
	sets: ExerciseSet[];

	public get id(): string {
		return this._id;
	}

	public get totalTime(): number {
		return this.sets
			.map((ex) => ex.totalTime * ex.repeat)
			.reduce((partial, a) => partial + a, 0);
	}

	private constructor(name: string, sets: iExerciseSet[] = []) {
		this.name = name;
		this.sets = sets.map((set) => new ExerciseSet(set));
		this._id = '';
	}

	public addSet() {
		this.sets.push(new ExerciseSet());
	}

	public addToSet(index: number, exercise: iTimedExercise) {
		this.sets[index].exercises.push(exercise);
	}

	public static async new(
		name: string,
		sets: iExerciseSet[],
	): Promise<Workout> {
		const workout = new Workout(name, sets);
		const ref = await addDoc(workoutRef(), workout.data);
		workout._id = ref.id;
		await setDoc(doc(workoutRef(), ref.id), workout.data);
		return workout;
	}

	public get data(): iWorkout {
		return {
			id: this.id,
			name: this.name,
			sets: this.sets.map((set) => set.data),
		};
	}

	public async save() {
		await setDoc(doc(workoutRef(), this.id), this.data, {merge: true});
	}

	public static fromData(data: iWorkout): Workout {
		const e = new Workout(data.name, data.sets);
		e._id = data.id;
		return e;
	}

	public static async fromDB(id: string): Promise<Workout> {
		const data = await getDoc(doc(workoutRef(), id));
		const workout = Workout.fromData(data.data() as iWorkout);
		workout._id = id;
		return workout;
	}

	public async rm() {
		await deleteDoc(doc(workoutRef(), this.id));
	}

	public static async allWorkouts(): Promise<Workout[]> {
		const snapshot = await getDocs(workoutRef());

		const docs: Workout[] = [];
		snapshot.forEach((workout) => {
			const wk = Workout.fromData(workout.data() as iWorkout);
			wk._id = workout.id;
			docs.push(wk);
		});
		return docs;
	}
}
