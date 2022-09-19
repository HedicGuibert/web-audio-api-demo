import Player from '../../../src/player/Player.js';
import parse from '../../../src/parse/parse.js';
import placeholder from './placeholder.js';
import Note from '../../../src/notes/Note.js';

const playMusic = async (button: HTMLButtonElement, tablature: HTMLTextAreaElement) => {
	if (!Player.isPlaying) {
		let musicToPlay = tablature.value;

		if (!tablature.value && tablature.placeholder) {
			musicToPlay = tablature.placeholder;
		}

		const playMusicListener = () => playMusic(button, tablature);

		button.textContent = 'Stop';
		button.addEventListener('click', () => stopMusic(button, playMusicListener), {once: true});
		button.removeEventListener('click', playMusicListener);

		const errorBox = document.querySelector('div.error-box');

		if (errorBox) {
			errorBox.parentElement?.removeChild(errorBox);
			tablature.classList.remove('has-error');
		}

		const parsedMusic = parse(musicToPlay);

		// Prevent a few weird bugs where the parser would return some broken notes
		if (parsedMusic.length < 10) {
			button.textContent = 'Play it!';
			button.addEventListener('click', playMusicListener, {once: true});

			return addFormError(tablature);
		}

		const playerResult = await Player.play(parsedMusic);

		if (playerResult.hasErrors) {
			if (!tablature.classList.contains('has-error')) {
				addFormError(tablature);
			}
		}

		if (playerResult.hasFinishedPlaying && !playerResult.hasErrors) {
			button.textContent = 'Play it!';
			button.addEventListener('click', () => playMusicListener, {once: true});
		}
	}
};

const stopMusic = (button: HTMLButtonElement, playMusicListener: EventListener) => {
	Player.stop();

	button.textContent = 'Play it!';
	button.addEventListener('click', playMusicListener, {once: true});
};

const parseAsJson = (notes: Note[]) => {
	const jsonOutput = document.getElementById('js-json-output') as HTMLTextAreaElement;
	const copy = document.getElementById('js-copy') as HTMLButtonElement;

	jsonOutput.value = JSON.stringify(notes.map(note => ({
		keys: note.keys}) ), null, 1);

	copy.addEventListener('click', (e) => {
		e.preventDefault();

		if (jsonOutput.value) {
			navigator.clipboard.writeText(jsonOutput.value);
			copy.textContent = 'Copied!';

			window.setTimeout(() => copy.textContent = 'Copy to clipboard', 2000);
		}
	});
};

const addFormError = (targetElement: HTMLElement) => {
	const formSection = document.querySelector('.form-section') as HTMLDivElement;

	targetElement.classList.add('has-error');

	const errorBox = document.createElement('div');
	errorBox.classList.add('error-box');
	errorBox.textContent = 'The tablature couldn\'t be played. Are you sure you used the right format ?';
	formSection.insertAdjacentElement('afterbegin', errorBox);
};

const handleForm = () => {
	const tablature = document.getElementById('js-tablature') as HTMLTextAreaElement;
	const play = document.getElementById('js-play') as HTMLButtonElement;
	const parseInput = document.getElementById('js-parse-input') as HTMLButtonElement;
	const parseCurrent = document.getElementById('js-parse-current') as HTMLButtonElement;

	tablature.placeholder = placeholder;

	play.addEventListener('click', (e) => {
		e.preventDefault();

		playMusic(play, tablature), {once: true};
	});

	parseInput.addEventListener('click', (e) => {
		e.preventDefault();

		if (tablature.value) {
			parseAsJson(parse(tablature.value));
		}
	});

	parseCurrent.addEventListener('click', (e) => {
		e.preventDefault();

		parseAsJson(Player.notes);
	});
};

export default handleForm;
