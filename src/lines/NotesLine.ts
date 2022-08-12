export default class NotesLine {
	#octave: string;

	#noteLine: string;

	#parsedLine: string[] = [];

	/**
	 * Parse a line so it can be transformed into Notes.
	 *
	 * @param noteLine String
	 */
	constructor(noteLine: string) {
		this.#noteLine = noteLine;
		// Octave may be in first or in 4th position.
		this.#octave = noteLine[0].match(/[0-8]/) ? noteLine[0] : noteLine[3];

		this.#parse();
	}

	get noteLine() {
		return this.#noteLine;
	}

	set noteLine(noteLine) {
		this.#noteLine = noteLine;
	}

	get parsedLine() {
		return this.#parsedLine;
	}

	insertNote(note: string, index: number) {
		if (this.#parsedLine[index] === '-') {
			this.#parsedLine[index] = '';
		}

		this.#parsedLine[index] += note;

		return this.#parsedLine;
	}

	/**
	 * Takes a raw line and transforms it into a usable one
	 * Input will be something like : 5|-----------------c---c---c|
	 * Output then will be : -----------------c5---c5---c5
	 */
	#parse() {
		this.#parsedLine = this.#noteLine
			.trim()
			// Remove all the useless |, right/left hand indications, and the octave
			.replace(/[|]|[0-8]|[LH:]|[RH:]/g, '')
			.split('')
			// We append the octave of the line to each note
			.map((char) => (char.match(/([a-zA-Z])/g) ? (char + this.#octave) : char));
	}
}
