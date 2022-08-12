import Key from './Key.js';
import notesValuesMap from '../helpers/notesValuesMap.js';
export default class Note {
    #keys = [];
    constructor(stringNote) {
        this.#parse(stringNote);
    }
    get keys() {
        return this.#keys;
    }
    #parse(stringNote) {
        const match = stringNote.match(/[-]+/g);
        const beat = match ? match[0].length : 0;
        if (!stringNote.match(/\w+/g)) {
            return this.#createKey(0, beat);
        }
        Array.from(stringNote.matchAll(/[\w\w]+/g))
            .forEach(match => match[0]
            .match(/.{1,2}/g)
            ?.forEach(noteAndOctave => {
            const note = noteAndOctave.match(/[A-Z][0-8]/)
                ? `${noteAndOctave[0]}#${noteAndOctave[1]}`
                : noteAndOctave.toUpperCase();
            const frequency = notesValuesMap[note];
            this.#createKey(frequency, beat);
        }));
    }
    #createKey(frequency, beat) {
        const key = new Key(frequency, beat);
        this.#keys.push(key);
    }
}
