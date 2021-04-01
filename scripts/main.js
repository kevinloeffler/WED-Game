import {hands, rock, paper, scissor} from "./choices.js";

// Assign often used elements
const playerHandFeedback = document.querySelector('#player-hand-feedback')
const oppFeedback = document.querySelector('#opp-feedback')
const feedback = document.querySelector('#feedback')
const enterButton = document.querySelector('#enter-button')
const leaderboardButton = document.querySelector('#leaderboard-button')
const leaderboardView = document.querySelector('.leaderboard-wrapper')
const playView = document.querySelector('.play-wrapper')

enterButton.addEventListener('click', enter)
leaderboardButton.addEventListener('click', leave)

function enter() {
    const enterError = document.querySelector('#enter-error-msg')
    const playerName = document.querySelector('#player-name')

    if (playerName.value.length < 3 || playerName.value.length > 50) {
        enterError.classList.add('enter-error-msg-active')
    } else {
        enterError.classList.remove('enter-error-msg-active')
        changeView('play')
    }
}

function leave() {
    changeView('leaderboard')
}

function changeView(target) {
    if (target === 'play') {
        leaderboardView.classList.add('hide-view-wrapper')
        playView.classList.remove('hide-view-wrapper')
    } else if (target === 'leaderboard') {
        leaderboardView.classList.remove('hide-view-wrapper')
        playView.classList.add('hide-view-wrapper')
    }
}

function renderChoices() {
    const choicesList = document.querySelector('#choices')
    const fragment = document.createDocumentFragment()

    for (const hand of hands) {
        const listItem = document.createElement('button')
        listItem.setAttribute('data-hand', hand.name)
        const choiceTitle = document.createTextNode(hand.name)
        listItem.appendChild(choiceTitle)
        fragment.appendChild(listItem)
    }
    choicesList.addEventListener('click', userPick)
    choicesList.appendChild(fragment)
}

function userPick(click) {
    const hand = findHand(click.target.getAttribute('data-hand'))
    const opponent = aiPickHand()
    const result = hand.vs(opponent)
    finishRound(result, hand, opponent)
}

function findHand(target) {
    for (const hand of hands) {
        if (target === hand.name) return hand
    }
}

function aiPickHand() {
    return hands[Math.floor(Math.random() * hands.length)]
}

function finishRound(result, hand, opponent) {
    switch (result) {
        case 1:
            feedback.textContent = 'Congrats, you won!'
            // TODO add point
            console.log('Round won')
            break
        case -1:
            feedback.textContent = 'Oh no, you lost.'
            console.log('Round lost')
            break
        case 0:
            feedback.textContent = 'Its a tie.'
            console.log('Round tied')
            break
    }
    playerHandFeedback.textContent = hand.name
    oppFeedback.textContent = opponent.name
}

renderChoices()

/*
console.log('isConnected:', isConnected());

getRankings((rankings) => console.log('rankings:', rankings));

function pickHand() {
    const handIndex = Math.floor(Math.random() * 3);
    return HANDS[handIndex];
}

let count = 1;

function printWinner(hand, didWin) {
    console.log(count++, hand, didWin);
}

for (let i = 1; i < 10; i++) {
    const hand = pickHand();
    evaluateHand('peter', hand, (didWin) => printWinner(hand, didWin));
}
*/