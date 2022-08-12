import Key from '../notes/Key.js';
import Note from '../notes/Note.js';
import PlayerResult from './PlayerResult.js';

class Player {
	#audioContext: AudioContext;

	#isPlaying = false;

	#notes: Note[] = [];

	constructor() {
		this.#audioContext = new AudioContext();
	}

	play = async (notes: Note[]): Promise<PlayerResult> => {
		if (this.#isPlaying) {
			return new PlayerResult();
		}

		this.#isPlaying = true;
		this.#notes = notes;

		// We first play an empty note because sometimes the first note doesn't play well.
		await this.#playNote(new Note('---').keys);

		for (const note of notes) {
			if (!this.#isPlaying) {
				return new PlayerResult();
			}

			try {
				await this.#playNote(note.keys);
			} catch (e) {
				this.#notes = [];

				return new PlayerResult(true, true);
			}
		}

		this.stop();

		return new PlayerResult(false, true);
	};

	stop = () => {
		this.#notes = [];
		this.#isPlaying = false;
	};

	get notes() {
		return this.#notes;
	}

	get isPlaying() {
		return this.#isPlaying;
	}

	#playNote = (keys: Key[]) =>
		new Promise<void>((resolve) => {
			const oscillators = keys.map(({ frequency, beat }) => {
				const oscillator = new OscillatorNode(this.#audioContext);
				const gain = new GainNode(this.#audioContext);

				const noteDuration = beat * 0.18;

				oscillator.connect(gain);
				oscillator.type = 'triangle';
				oscillator.frequency.value = frequency;

				gain.connect(this.#audioContext.destination);
				gain.gain.setValueAtTime(0, this.#audioContext.currentTime);
				gain.gain.linearRampToValueAtTime(0.15, this.#audioContext.currentTime + 0.01);
				gain.gain.linearRampToValueAtTime(0, this.#audioContext.currentTime + noteDuration - 0.01);

				return { oscillator, noteDuration };
			});

			oscillators.forEach(({ oscillator }) => oscillator.start(this.#audioContext.currentTime));

			setTimeout(() => {
				oscillators.forEach(({ oscillator }) => {
					oscillator.stop(0);
					oscillator.disconnect();
				});

				resolve();
			}, oscillators[0].noteDuration * 1000);
		});
}

export default new Player();
