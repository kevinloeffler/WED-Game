export class Player {

    nickname
    score
    history = []

    constructor(nickname, score = 0) {
        this.nickname = nickname
        this.score = score
    }

    addWin() {
        this.score++
    }

    get score() {
        return this.score
    }

    set score(newScore) {
        this.score = newScore
    }

    get history() {
        return this.history
    }

    addToHistory(roundResult) {
        this.history.push(roundResult)
    }

}