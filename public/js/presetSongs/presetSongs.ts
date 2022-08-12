import songsMap from '../../../songs/songsMap.js';
import Song from '../../../songs/interface/Song.js';
import PresetSong from './PresetSong.js';

export default () => {
	const container = document.getElementById('js-preset-songs') as HTMLDivElement;

	songsMap.forEach((song: Song) => {
		const presetSong = new PresetSong(song);

		container.appendChild(presetSong.createHTML());
	});
};
