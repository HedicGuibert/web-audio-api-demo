export default class NotesLine {
    #octave;
    #noteLine;
    #parsedLine = [];
    constructor(noteLine) {
        this.#noteLine = noteLine;
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
    insertNote(note, index) {
        if (this.#parsedLine[index] === '-') {
            this.#parsedLine[index] = '';
        }
        this.#parsedLine[index] += note;
        return this.#parsedLine;
    }
    #parse() {
        this.#parsedLine = this.#noteLine
            .trim()
            .replace(/[|]|[0-8]|[LH:]|[RH:]/g, '')
            .split('')
            .map((char) => (char.match(/([a-zA-Z])/g) ? (char + this.#octave) : char));
    }
}
