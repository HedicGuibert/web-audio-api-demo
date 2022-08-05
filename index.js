const playNote = (audioContext, notes) =>
  new Promise((resolve) => {
    const oscillators = notes.map(({ frequency, beat }) => {
      const oscillator = new OscillatorNode(audioContext);
      const gain = new GainNode(audioContext);

      const noteDuration = beat * 0.18;

      oscillator.connect(gain);
      oscillator.type = 'triangle';
      oscillator.frequency.value = frequency;

      gain.connect(audioContext.destination);
      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
      gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteDuration - 0.01);

      return { oscillator, noteDuration };
    });

    oscillators.forEach(({ oscillator }) => oscillator.start(audioContext.currentTime));

    setTimeout(() => {
      oscillators.forEach(({ oscillator }) => {
        oscillator.stop(0);
        oscillator.disconnect();
      });

      resolve();
    }, oscillators[0].noteDuration * 1000);
  });

const playAudio = async () => {
  const audioContext = new window.AudioContext();

  for (const note of result) {
    // console.log(...note);
    await playNote(audioContext, note);
  }
};

const addKonamiCode = () => {
  window.addEventListener('click', playAudio);
};

addKonamiCode();
