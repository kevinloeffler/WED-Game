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

    info() {
        console.log('name: ' + this.name)
        console.log('wins: ' + this.wins)
        console.log('loses: ' + this.loses)
    }

    vs(opponent) {
        if (this.loses.includes(opponent)) {
            return false
        } else if (this.wins.includes(opponent)) {
            return true
        } else {
            throw new Error('Invalid game. No winner determined')
        }
    }

}

export const rock = new Choice('rock', [], [])
export const paper = new Choice('paper', [], [])
export const scissor = new Choice('scissor', [], [])

export const hands = [rock, paper, scissor]

rock.wins = [scissor]
rock.loses = [paper]
paper.wins = [rock]
paper.loses = [scissor]
scissor.wins = [paper]
scissor.loses = [rock]
