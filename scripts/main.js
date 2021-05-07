import {hands} from './choices.js'
import Player from './player.js'
import leaderboard from './leaderboard.js'
import {aiPickHand, evaluateHand, findHand, DELAY_MS} from './game-service.js'

// Init
const player1 = new Player('Marty McFly', true, 11)
const player2 = new Player('Axel Foley', true, 2)
const player3 = new Player('Ferris Bueller', true, 5)
leaderboard.addPlayer(player1)
leaderboard.addPlayer(player2)
leaderboard.addPlayer(player3)
let player = null

// Assign often used html elements
const leaderboardView = document.querySelector('.leaderboard-wrapper')
const leaderboardList = document.querySelector('#leaderboard')
const enterButton = document.querySelector('#enter-button')
const enterError = document.querySelector('#enter-error-msg')
const playerName = document.querySelector('#player-name')
const playView = document.querySelector('.play-wrapper')
const pickPlayerName = document.querySelector('#pick-player-name')
const startGameMsg = document.querySelector('#start-game-msg')
const feedbackMsg = document.querySelector('#feedback-msg')
const choicesList = document.querySelector('#choices')
const feedback = document.querySelector('#feedback')
const playerHandFeedback = document.querySelector('#player-hand-feedback')
const oppFeedback = document.querySelector('#opp-feedback')
const leaderboardButton = document.querySelector('#leaderboard-button')
const historyList = document.querySelector('#history-list')
const scoreCount = document.querySelector('#score-count')

function renderPlayerName() {
    pickPlayerName.innerHTML = `PICK YOUR HAND ${player.nickname.toUpperCase()}`
}

async function renderWaitText(cooldown) {
    pickPlayerName.innerHTML = `WAIT FOR ${cooldown.toString()} SECONDS`
    return new Promise((resolve) => {
        setTimeout(() => { resolve(cooldown) }, DELAY_MS);
    })
}

async function delay() {
    choicesList.classList.add('choices-disabled')
    for (let i = 3; i > 0; i--) {
        /* eslint-disable no-await-in-loop */
        await renderWaitText(i)
    }
    renderPlayerName()
    choicesList.classList.remove('choices-disabled')
}

function renderLeaderboard() {
    let fragment = ''
    leaderboardList.innerHTML = ''
    const sorted = leaderboard.localPlayers.sort(leaderboard.sortPlayers)
    let counter = 10
    // eslint-disable-next-line no-restricted-syntax
    for (const plr of sorted) {
        if (counter > 0) {
            const name = `<div class="leaderboard-player">${plr.nickname}</div>`
            const score = `<div class="leaderboard-score">${plr.score} Points</div>`
            const listItem = `<div class="leaderboard-item">${name}${score}</div>`
            fragment += listItem
        } else { break }
        counter--
    }
    leaderboardList.innerHTML = fragment
}

function renderChoices() {
    let fragment = ''
    // eslint-disable-next-line no-restricted-syntax
    for (const hand of hands) {
        const choiceShadow = '<div class="choice-shadow"></div>'
        const choiceIcon = `<img class="choice-icon" src="${hand.icon}" alt="${hand.name}">`
        const button = `<div class="choice-item" data-hand="${hand.name}" tabindex="0" role="button">${choiceIcon}${hand.name}${choiceShadow}</div>`
        fragment += button
    }
    choicesList.innerHTML = fragment
}

function renderStartGameMsg() {
    startGameMsg.classList.remove('feedback-hidden')
    feedbackMsg.classList.add('feedback-hidden')
    feedback.textContent = 'Good luck'
}

function renderRoundFeedbackMsg() {
    startGameMsg.classList.add('feedback-hidden')
    feedbackMsg.classList.remove('feedback-hidden')
}

function renderHistory() {
    let fragment = ''
    const arr = player.history
    historyList.innerHTML = ''

    for (let i = 0; i < 6; i++) {
        const result = `<p>${arr[i].result}</p>`
        const playerPick = `<p>${arr[i].player.name}</p>`
        const aiPick = `<p>${arr[i].ai.name}</p>`
        const listItem = `<div class="history-list-item">${playerPick}${result}${aiPick}</div>`
        fragment += listItem
    }
    historyList.innerHTML = fragment
}

function renderScore(newScore) {
    scoreCount.innerText = newScore
}

function changeView(target) {
    if (target === 'play') {
        renderPlayerName()
        renderStartGameMsg()
        renderHistory()
        renderScore(player.score)
        leaderboardView.classList.add('hide-view-wrapper')
        playView.classList.remove('hide-view-wrapper')
    } else if (target === 'leaderboard') {
        renderLeaderboard()
        leaderboardView.classList.remove('hide-view-wrapper')
        playView.classList.add('hide-view-wrapper')
    }
}

function enterGame() {
    if (playerName.value.length < 3 || playerName.value.length > 20) {
        enterError.classList.add('enter-error-msg-active')
    } else {
        enterError.classList.remove('enter-error-msg-active')
        const playerRequestingEnter = leaderboard.checkPlayerName(playerName.value)
        if (playerRequestingEnter) {
            player = playerRequestingEnter
        } else {
            player = new Player(playerName.value, false)
            leaderboard.addPlayer(player)
        }
        changeView('play')
    }
}

function leaveGame() {
    changeView('leaderboard')
    player = null
}

async function userPick(click) {
    const hand = findHand(click.target.getAttribute('data-hand'))
    const opponent = aiPickHand()
    const result = hand.vs(opponent)

    feedback.textContent = evaluateHand(player, result, hand, opponent)
    renderHistory()
    renderScore(player.score)
    renderRoundFeedbackMsg()
    playerHandFeedback.textContent = hand.name
    oppFeedback.textContent = opponent.name

    await delay()
}

function choicesHandleEnter(key) {
    /* This helps people with disabilities (no mouse) play the game */
    if (key.keyCode === 13) {
        document.activeElement.click()
    }
}

renderChoices()
renderLeaderboard()
enterButton.addEventListener('click', enterGame)
leaderboardButton.addEventListener('click', leaveGame)
choicesList.addEventListener('click', userPick)
document.addEventListener('keyup', choicesHandleEnter)
