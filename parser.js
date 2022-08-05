// const string = `3|d---d-d---d-d---d-d-d-d-d-|

// 3|--d-d---d-d---d-d---c-d---|
// 2|------------------a-------|

// 3|d---d-e-f---f---f-g-e---e-|

// 3|--d-c-c-d-------c-d---d---|
// 2|--------------a-----------|

// 3|d-e-f---f---f-g-e---e---d-|

// 3|c-d---------c-d---d---d-f-|
// 2|----------a---------------|

// 3|g---g---g-a-A---A---a-g-a-|

// 3|d-----d-e-f---f---g---a-d-|

// 3|----e-f-e---e---f-d-e-----|

// 4|----c-d---d---d-e-f---f---|
// 3|--a-----------------------|

// 4|f-g-e---e---d-c-c-d-------|
// 3|------------------------a-|

// 4|c-d---d---d-e-f---f---f-g-|

// 4|e---e---d-c-d---------c-d-|
// 3|--------------------a-----|

// 4|--d---d-f-g---g---g-a-A---|

// 4|A---a-g-a-d-----d-e-f---f-|

// 4|--g---a-d-----e-f-e---e---|

// 4|d-c-d---e---f---a---------|

// 4|f-d-----------A---------f-|
// 3|----a---------------------|

// 4|d-------------------------|
// 3|--A---------A-A---a-a---A-|

// 3|A-----f-g-a---a---a---A-a-|

// 3|--------g---g---g---g-a---|

// 3|------a---a---a---A-a-----|

// 3|----g---f---e---d-------d-|

// 3|e-f-----g-a---g---f---e---|

// 3|f-----g-a---g-------f-g-a-|

// 3|----g-f---e---f---e---d---|

// 3|--e-c---d-------d-e-f-----|

// 3|e-f---g---f---g---a---g---|

// 3|f---d-------d-e-f---g---a-|

// 3|--A---d---g---f---g---f---|

// 3|e-----f-e---a-----------A-|

// 3|----------a---a---a---a-g-|

// 3|--------g-----------f-----|

// 3|------e---f---e---e-d-----|

// 3|----a-----------A---------|

// 4|----------c---------------|
// 3|--a---a-------a-g---------|

// 3|g-----------f-----------e-|

// 3|--f---e---d---------------|`

const string = `
5|-----------------c---c---c|
4|---------A----------------|
4|-----f---d---g-g--------b-|
4|---------f----------------|
3|---f-G-f------------------|`;

/*
Input will look like this
4|e---e---d-c-d---------c-d-|

4|e---e---d-c-d---------c-d-|
3|--------------------a-----|

3|--f---e---d---------------|
*/
const result = string
  .trim()
  .split('\n\n')
  .map(noteLine => {
    // If notes on the same line don't have the same octave, this line will be split into multiple lines. We need to merge them into one.
    if (noteLine.includes('\n')) {
      noteLine = noteLine.split('\n').reduce((currentLine, nextLine) => {
        const secondLineOctave = nextLine[0];

        // We find all letters
        const allNotes = [...nextLine.matchAll(/[a-zA-Z]/g)];
        console.log(currentLine);
        console.log(nextLine);

        allNotes.forEach(match => {
          currentLine = currentLine.split('');
          // We replace the dash on the first line with the note and its octave
          currentLine[match['index'] + (currentLine.length - nextLine.length)] = match[0] + secondLineOctave;
          currentLine = currentLine.join('');
        });
        console.log(currentLine);
        console.log('\n');

        return currentLine;
      });
    }

    console.log(noteLine);
    return noteLine;
  })
  .join('')
  // We remove all the line breaks
  .replace(/(\r\n|\n|\r)/gm, '')
  // Each line starts with octave + | so we split them here
  .split(/(?=[0-8]\|)/g)
  // Remove all the |
  .map(notesBlock => notesBlock.replace(/\|/g, ''))
  .map(notesBlock => {
    const octave = notesBlock[0];

    return [...notesBlock]
      .slice(1)
      // We append the octave of the line to each note
      .map(char => char.match(/([a-zA-Z])/g) ? (char + octave) : char)
      .join('');
  })
  .join('')
  // Split notes into their letter, their octave, and all their dashes
  .split(/(?=[a-zA-Z][0-8])/)
  .map(fullNote => {
    // If this line was previously a double line, the note will have the octave of the current line + the octave of the original line
    if (fullNote.match(/[a-zA-Z][0-8]{2,}/)) {
      fullNote = fullNote[0] + fullNote[2] + fullNote.slice(3);
    }

    const noteAndOctave = fullNote.slice(0, 2);
    const beat = fullNote.slice(2).length;

    // Lowercase notes are regular notes and uppercase notes are sharp notes.
    // Sharp notes add a # between their letter and their octave
    // All letters are uppercase in our map
    const note = noteAndOctave.match(/[A-Z][0-8]/) ?
      noteAndOctave[0] + '#' + noteAndOctave[1] :
      noteAndOctave.toUpperCase();

    return [{
      frequency: notesValuesMap[note],
      beat
    }]
  })
;

console.log(result);
