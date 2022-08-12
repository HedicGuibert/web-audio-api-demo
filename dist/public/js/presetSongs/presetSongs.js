import songsMap from '../../../songs/songsMap.js';
import PresetSong from './PresetSong.js';
export default () => {
    const container = document.getElementById('js-preset-songs');
    songsMap.forEach((song) => {
        const presetSong = new PresetSong(song);
        container.appendChild(presetSong.createHTML());
    });
};
