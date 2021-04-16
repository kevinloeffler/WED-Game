class Choice {

    name
    icon
    loses = []
    wins = []

    constructor(name, loses, wins, icon) {
        this.name = name
        this.loses = loses
        this.wins = wins
        this.icon = icon
    }

    get name() {
        return this.name
    }

    vs(opponent) {
        if (this.loses.includes(opponent)) {
            return -1
        } else if (this.wins.includes(opponent)) {
            return 1
        } else {
            return 0
        }
    }

}

export const rock = new Choice('rock', [], [], './assets/images/Rock.svg')
export const paper = new Choice('paper', [], [], './assets/images/Paper.svg')
export const scissor = new Choice('scissor', [], [], './assets/images/Scissor.svg')
export const emptyHand = new Choice('&nbsp', [], [], '')

export const hands = [rock, paper, scissor]

rock.wins = [scissor]
rock.loses = [paper]
paper.wins = [rock]
paper.loses = [scissor]
scissor.wins = [paper]
scissor.loses = [rock]
