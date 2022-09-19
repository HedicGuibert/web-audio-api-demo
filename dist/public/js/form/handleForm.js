import Player from '../../../src/player/Player.js';
import parse from '../../../src/parse/parse.js';
import placeholder from './placeholder.js';
const playMusic = async (button, tablature) => {
    if (!Player.isPlaying) {
        let musicToPlay = tablature.value;
        if (!tablature.value && tablature.placeholder) {
            musicToPlay = tablature.placeholder;
        }
        const playMusicListener = () => playMusic(button, tablature);
        button.textContent = 'Stop';
        button.addEventListener('click', () => stopMusic(button, playMusicListener), { once: true });
        button.removeEventListener('click', playMusicListener);
        const errorBox = document.querySelector('div.error-box');
        if (errorBox) {
            errorBox.parentElement?.removeChild(errorBox);
            tablature.classList.remove('has-error');
        }
        const parsedMusic = parse(musicToPlay);
        if (parsedMusic.length < 10) {
            button.textContent = 'Play it!';
            button.addEventListener('click', playMusicListener, { once: true });
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
            button.addEventListener('click', () => playMusicListener, { once: true });
        }
    }
};
const stopMusic = (button, playMusicListener) => {
    Player.stop();
    button.textContent = 'Play it!';
    button.addEventListener('click', playMusicListener, { once: true });
};
const parseAsJson = (notes) => {
    const jsonOutput = document.getElementById('js-json-output');
    const copy = document.getElementById('js-copy');
    jsonOutput.value = JSON.stringify(notes.map(note => ({
        keys: note.keys
    })), null, 1);
    copy.addEventListener('click', (e) => {
        e.preventDefault();
        if (jsonOutput.value) {
            navigator.clipboard.writeText(jsonOutput.value);
            copy.textContent = 'Copied!';
            window.setTimeout(() => copy.textContent = 'Copy to clipboard', 2000);
        }
    });
};
const addFormError = (targetElement) => {
    const formSection = document.querySelector('.form-section');
    targetElement.classList.add('has-error');
    const errorBox = document.createElement('div');
    errorBox.classList.add('error-box');
    errorBox.textContent = 'The tablature couldn\'t be played. Are you sure you used the right format ?';
    formSection.insertAdjacentElement('afterbegin', errorBox);
};
const handleForm = () => {
    const tablature = document.getElementById('js-tablature');
    const play = document.getElementById('js-play');
    const parseInput = document.getElementById('js-parse-input');
    const parseCurrent = document.getElementById('js-parse-current');
    tablature.placeholder = placeholder;
    play.addEventListener('click', (e) => {
        e.preventDefault();
        playMusic(play, tablature), { once: true };
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
