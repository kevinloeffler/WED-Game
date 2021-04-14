export class Player {

    nickname
    score
    isFake
    history = []

    constructor(nickname, isFake, score = 0) {
        this.nickname = nickname
        this.isFake = isFake
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