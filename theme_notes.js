const themeNotes = [
  // Empty note because the first one might not play for some reason
  [{ frequency: 0, beat: 5 }],
  [{ frequency: 146.83, beat: 3 }], // D3
  [{ frequency: 146.83, beat: 1 }], // D3
  [{ frequency: 146.83, beat: 3 }], // D3
  [{ frequency: 146.83, beat: 1 }], // D3
  [{ frequency: 146.83, beat: 3 }], // D3
  [{ frequency: 146.83, beat: 1 }], // D3
  [{ frequency: 146.83, beat: 1 }], // D3
  [{ frequency: 146.83, beat: 1 }], // D3
  [{ frequency: 146.83, beat: 1 }], // D3
  [{ frequency: 146.83, beat: 3 }], // D3
  //
  [{ frequency: 146.83, beat: 1 }], // D3
  [{ frequency: 146.83, beat: 3 }], // D3
  [{ frequency: 146.83, beat: 1 }], // D3
  [{ frequency: 146.83, beat: 3 }], // D3
  [{ frequency: 146.83, beat: 1 }], // D3
  [{ frequency: 146.83, beat: 1 }], // D3
  [{ frequency: 110.00, beat: 1 }], // A2
  [{ frequency: 130.81, beat: 1 }], // C3
  [{ frequency: 146.83, beat: 3 }], // D3
  //
  [{ frequency: 146.83, beat: 3 }], // D3
  [{ frequency: 146.83, beat: 1 }], // D3
  [{ frequency: 164.81, beat: 1 }], // E3
  [{ frequency: 174.61, beat: 3 }], // F3
  [{ frequency: 174.61, beat: 3 }], // F3
  [{ frequency: 174.61, beat: 1 }], // F3
  [{ frequency: 196.00, beat: 1 }], // G3
  [{ frequency: 164.81, beat: 3 }], // E3
  [{ frequency: 164.81, beat: 3 }], // E3
  //
  [{ frequency: 146.83, beat: 3 }], // D3
  [{ frequency: 130.81, beat: 1 }], // C3
  [{ frequency: 130.81, beat: 1 }], // C3
  [{ frequency: 146.83, beat: 5 }], // D3
  [{ frequency: 110.00, beat: 1 }], // A2
  [{ frequency: 130.81, beat: 1 }], // C3
  [{ frequency: 146.83, beat: 3 }], // D3
  [{ frequency: 146.83, beat: 3 }], // D3
  //
  [{ frequency: 146.83, beat: 1 }], // D3
  [{ frequency: 164.81, beat: 1 }], // E3
  [{ frequency: 174.61, beat: 3 }], // F3
  [{ frequency: 174.61, beat: 3 }], // F3
  [{ frequency: 174.61, beat: 1 }], // F3
  [{ frequency: 196.00, beat: 1 }], // G3
  [{ frequency: 164.81, beat: 3 }], // E3
  [{ frequency: 164.81, beat: 3 }], // E3
  [{ frequency: 146.83, beat: 1 }], // D3
  //
  [{ frequency: 130.81, beat: 1 }], // C3
  [{ frequency: 146.83, beat: 7 }], // D3
  [{ frequency: 110.00, beat: 1 }], // A2
  [{ frequency: 130.81, beat: 1 }], // C3
  [{ frequency: 146.83, beat: 3 }], // D3
  [{ frequency: 146.83, beat: 3 }], // D3
  [{ frequency: 146.83, beat: 1 }], // D3
  [{ frequency: 174.61, beat: 1 }], // F3
  //
  [{ frequency: 196.00, beat: 3 }], // G3
  [{ frequency: 196.00, beat: 3 }], // G3
  [{ frequency: 196.00, beat: 1 }], // G3
  [{ frequency: 220.00, beat: 1 }], // A3
  [{ frequency: 233.08, beat: 3 }], // A#3
  [{ frequency: 233.08, beat: 3 }], // A#3
  [{ frequency: 220.00, beat: 1 }], // A3
  [{ frequency: 196.00, beat: 1 }], // G3
  [{ frequency: 220.00, beat: 1 }], // A3
  //
  [{ frequency: 146.83, beat: 5 }], // D3
  [{ frequency: 146.83, beat: 1 }], // D3
  [{ frequency: 164.81, beat: 1 }], // E3
  [{ frequency: 174.61, beat: 3 }], // F3
  [{ frequency: 174.61, beat: 3 }], // F3
  [{ frequency: 196.00, beat: 3 }], // G3
  [{ frequency: 220.00, beat: 1 }], // A3
  [{ frequency: 146.83, beat: 5 }], // D3
  //
  [{ frequency: 164.81, beat: 1 }], // E3
  [{ frequency: 174.61, beat: 1 }], // F3
  [{ frequency: 164.81, beat: 3 }], // E3
  [{ frequency: 164.81, beat: 3 }], // E3
  [{ frequency: 174.61, beat: 1 }], // F3
  [{ frequency: 146.83, beat: 1 }], // D3
  [{ frequency: 164.81, beat: 7 }], // E3
  //
  [{ frequency: 220.00, beat: 1 }], // A3
  [{ frequency: 261.63, beat: 1 }], // C4
  [{ frequency: 293.66, beat: 3 }], // D4
  [{ frequency: 293.66, beat: 3 }], // D4
  [{ frequency: 293.66, beat: 1 }], // D4
  [{ frequency: 329.63, beat: 1 }], // E4
  [{ frequency: 349.23, beat: 3 }], // F4
  [{ frequency: 349.23, beat: 3 }], // F4
  //
  [{ frequency: 349.23, beat: 1 }], // F4
  [{ frequency: 440.00, beat: 1 }], // G4
  [{ frequency: 329.63, beat: 3 }], // E4
  [{ frequency: 329.63, beat: 3 }], // E4
  [{ frequency: 293.66, beat: 1 }], // D4
  [{ frequency: 261.63, beat: 1 }], // C4
  [{ frequency: 261.63, beat: 1 }], // C4
  [{ frequency: 293.66, beat: 5 }], // D4
  [{ frequency: 220.00, beat: 1 }], // A3
  //
  [{ frequency: 261.63, beat: 1 }], // C4
  [{ frequency: 293.66, beat: 3 }], // D4
  [{ frequency: 293.66, beat: 3 }], // D4
  [{ frequency: 293.66, beat: 1 }], // D4
  [{ frequency: 329.63, beat: 1 }], // E4
  [{ frequency: 349.23, beat: 3 }], // F4
  [{ frequency: 349.23, beat: 3 }], // F4
  [{ frequency: 349.23, beat: 1 }], // F4
  [{ frequency: 440.00, beat: 1 }], // G4
  //
];
