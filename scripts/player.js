import RoundResult from './roundResult.js'
import {emptyHand} from './choices.js'

class Player {
    constructor(nickname, isFake, score = 0) {
        this.nickname = nickname
        this.isFake = isFake
        this.score = score
        this.history = []
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

export default Player
