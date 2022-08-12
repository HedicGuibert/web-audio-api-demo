export default class PlayerResult {
    hasErrors;
    hasFinishedPlaying;
    constructor(hasErrors = false, hasFinishedPlaying = false) {
        this.hasErrors = hasErrors;
        this.hasFinishedPlaying = hasFinishedPlaying;
    }
}
