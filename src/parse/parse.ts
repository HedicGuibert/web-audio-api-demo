import NotesLine from '../lines/NotesLine.js';
import Note from '../notes/Note.js';

/**
* Takes a raw tablature and parses it into an array of Notes.
*
* @param tablature String
* @returns Note[]
*/
export default (tablature: string): Note[] => {
	const parsedLines = tablature
		.trim()
		// Different lines are separated by \n\n.
		.split('\n\n')
		.map((noteLine) => {
			// If notes on the same line don't have the same octave, this line will be split into multiple lines. We need to merge them into one.
			if (noteLine.includes('\n')) {
				return noteLine
					.split('\n')
					.map(line => new NotesLine(line))
					.reduce((previousLine, currentLine) => {
					// We find all {letter + octave} from previous line and append them to current line.
						previousLine.parsedLine
							.map(char => char.match(/^([a-zA-Z][0-8])+$/))
							.forEach((note, index) => note ? currentLine.insertNote(note[0], index) : null);

						return currentLine;
					});
			}

			return new NotesLine(noteLine);
		});


	// We make it a big string so we can get each note separately
	const aggregatedLines = parsedLines
		.map(line => line.parsedLine.join(''))
		.join('');

	// Regex to group notes by alphanumeric characters + all trailing dashes representing the beat of the note.
	// Also match "notes" only composed of dashes because some songs don't play immediately and start with dashes.
	return Array.from(aggregatedLines.matchAll(/((\w+)([-])*)|[-]*/g))
		.map(stringNote => new Note(stringNote[0]));
};
