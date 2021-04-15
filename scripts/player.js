import {RoundResult} from "./roundResult.js";
import {emptyHand} from "./choices.js";

export class Player {

    nickname
    score
    isFake
    history = []

    constructor(nickname, isFake, score = 0) {
        this.nickname = nickname
        this.isFake = isFake
        this.score = score
        for (let i = 0; i < 6; i++) {
            this.addToHistory(new RoundResult('', emptyHand, emptyHand))
        }
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
        this.history.unshift(roundResult)
    }

}