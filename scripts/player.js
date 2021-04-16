import RoundResult from "./roundResult.js"
import {emptyHand} from "./choices.js"

export class Player {

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

    addToHistory(roundResult) {
        this.history.unshift(roundResult)
    }

}
