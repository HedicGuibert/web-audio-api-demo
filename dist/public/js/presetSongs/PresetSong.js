import parse from '../../../src/parse/parse.js';
import Player from '../../../src/player/Player.js';
export default class PresetSong {
    #song;
    constructor(song) {
        this.#song = song;
    }
    createHTML() {
        const card = document.createElement('div');
        card.classList.add('card');
        const titleContainer = document.createElement('div');
        titleContainer.classList.add('card-title-container');
        card.appendChild(titleContainer);
        const title = document.createElement('h4');
        title.textContent = this.#song.title;
        title.classList.add('card-title');
        titleContainer.appendChild(title);
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('card-content-container');
        card.appendChild(contentContainer);
        const author = document.createElement('p');
        author.textContent = this.#song.author;
        author.classList.add('card-content');
        contentContainer.appendChild(author);
        const button = document.createElement('button');
        button.textContent = 'Play this song';
        button.classList.add('card-button');
        card.addEventListener('click', () => this.playAction(button, card));
        contentContainer.appendChild(button);
        return card;
    }
    async playAction(button, card) {
        if (!Player.isPlaying) {
            button.textContent = 'Stop';
            card.addEventListener('click', () => this.stopAction(button, card), { once: true });
            const playerResult = await Player.play(parse(this.#song.tablature));
            if (playerResult.hasFinishedPlaying) {
                button.textContent = 'Play this song';
                card.addEventListener('click', () => this.playAction(button, card), { once: true });
            }
        }
    }
    stopAction(button, card) {
        if (Player.isPlaying) {
            Player.stop();
            button.textContent = 'Play this song';
            card.addEventListener('click', () => this.playAction(button, card), { once: true });
        }
    }
}
