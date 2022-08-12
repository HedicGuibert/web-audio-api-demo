import NotesLine from '../lines/NotesLine.js';
import Note from '../notes/Note.js';
export default (tablature) => {
    const parsedLines = tablature
        .trim()
        .split('\n\n')
        .map((noteLine) => {
        if (noteLine.includes('\n')) {
            return noteLine
                .split('\n')
                .map(line => new NotesLine(line))
                .reduce((previousLine, currentLine) => {
                previousLine.parsedLine
                    .map(char => char.match(/^([a-zA-Z][0-8])+$/))
                    .forEach((note, index) => note ? currentLine.insertNote(note[0], index) : null);
                return currentLine;
            });
        }
        return new NotesLine(noteLine);
    });
    const aggregatedLines = parsedLines
        .map(line => line.parsedLine.join(''))
        .join('');
    return Array.from(aggregatedLines.matchAll(/((\w+)([-])*)|[-]*/g))
        .map(stringNote => new Note(stringNote[0]));
};
