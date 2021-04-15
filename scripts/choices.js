class Choice {

    name
    loses = []
    wins = []

    constructor(name, loses, wins) {
        this.name = name
        this.loses = loses
        this.wins = wins
    }

    get name() {
        return this.name
    }

    vs(opponent) {
        if (this.loses.includes(opponent)) {
            return -1 // Lost
        } else if (this.wins.includes(opponent)) {
            return 1 // Won
        } else {
            return 0 // Tie
        }
    }

}

export const rock = new Choice('rock', [], [])
export const paper = new Choice('paper', [], [])
export const scissor = new Choice('scissor', [], [])
export const emptyHand = new Choice('&nbsp', [], [])

export const hands = [rock, paper, scissor]

rock.wins = [scissor]
rock.loses = [paper]
paper.wins = [rock]
paper.loses = [scissor]
scissor.wins = [paper]
scissor.loses = [rock]
