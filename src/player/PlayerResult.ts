export default class PlayerResult {
	hasErrors: boolean;
	hasFinishedPlaying: boolean;

	constructor(hasErrors = false, hasFinishedPlaying = false) {
		this.hasErrors = hasErrors;
		this.hasFinishedPlaying = hasFinishedPlaying;
	}
}
