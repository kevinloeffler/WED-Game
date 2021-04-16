class Choice {
    constructor(name, loses, wins, icon) {
        this.name = name
        this.loses = loses
        this.wins = wins
        this.icon = icon
    }

    vs(opponent) {
        if (this.loses.includes(opponent)) {
            return -1
        }
        if (this.wins.includes(opponent)) {
            return 1
        }
        return 0
    }
}

const rock = new Choice('rock', [], [], './assets/images/Rock.svg')
const paper = new Choice('paper', [], [], './assets/images/Paper.svg')
const scissor = new Choice('scissor', [], [], './assets/images/Scissor.svg')
export const emptyHand = new Choice('&nbsp', [], [], '')

rock.wins = [scissor]
rock.loses = [paper]
paper.wins = [rock]
paper.loses = [scissor]
scissor.wins = [paper]
scissor.loses = [rock]

export const hands = [rock, paper, scissor]
