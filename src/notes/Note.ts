import Key from './Key.js';
import notesValuesMap from '../helpers/notesValuesMap.js';

export default class Note {
	#keys: Key[] = [];

	/**
	 * Takes a string note (like a4------) and transforms it into playable keys.
	 *
	 * @param stringNote String
	 */
	constructor(stringNote: string) {
		this.#parse(stringNote);
	}

	get keys() {
		return this.#keys;
	}

	#parse(stringNote: string) {
		const match = stringNote.match(/[-]+/g);

		const beat = match ? match[0].length : 0;

		if (!stringNote.match(/\w+/g)) {
			return this.#createKey(0, beat);
		}

		// Get all notes with their octave
		Array.from(stringNote.matchAll(/[\w\w]+/g))
			.forEach(match => match[0]
				// Split them.This is because some notes are multiple notes played at the same time
				// Therefore, we may have things like f4a4c3 : these are 3 notes played simultaneously
				.match(/.{1,2}/g)
				?.forEach(noteAndOctave => {
					// Uppercased letters represent sharp notes.
					const note = noteAndOctave.match(/[A-Z][0-8]/)
					// Sharp notes have a sharp sign, whereas regular ones don't.
					// They should all be uppercase
						? `${noteAndOctave[0]}#${noteAndOctave[1]}`
						: noteAndOctave.toUpperCase();

					const frequency: number = notesValuesMap[note as keyof object];

					this.#createKey(frequency, beat);
				})
			);
	}

	#createKey(frequency: number, beat: number) {
		const key = new Key(frequency, beat);

		this.#keys.push(key);
	}
}
