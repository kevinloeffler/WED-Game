import {hands, rock, paper, scissor} from "./choices.js";

function renderOptions() {
    const orderedList = document.querySelector('#selectionList')
    const fragment = document.createDocumentFragment()

    for (const hand of hands) {
        const listItem = document.createElement('li')
        listItem.setAttribute('class', 'choice-item')
        listItem.setAttribute('data-hand', hand.name)
        listItem.addEventListener('click', picked)
        const choiceTitle = document.createTextNode(hand.name)
        listItem.appendChild(choiceTitle)
        fragment.appendChild(listItem)
    }
    orderedList.appendChild(fragment)
}

function picked(click) {
    const hand = findHand(click.target.getAttribute('data-hand'))
    const opponent = aiPickHand()
    const result = hand.vs(opponent)
    console.log(result)
}

function findHand(target) {
    for (const hand of hands) {
        if (target === hand.name) return hand
    }
}

function aiPickHand() {
    return hands[Math.floor(Math.random() * hands.length)]
}

renderOptions()

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