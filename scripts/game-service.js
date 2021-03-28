const DELAY_MS = 1000;
const rankings = {
    // Test Rankings
    Markus: {name: 'Markus', win: 3, lost: 6},
    Michael: {name: 'Michael', win: 4, lost: 5},
    Lisa: {name: 'Lisa', win: 4, lost: 5},
};
export const HANDS = ['scissors', 'stone', 'paper'];

function aiPickHand() {
    return HANDS[Math.floor(Math.random() * HANDS.length)]
}



/*

let isConnectedState = false;

export function setConnected(newIsConnected) {
    isConnectedState = Boolean(newIsConnected);
}

export function isConnected() {
    return isConnectedState;
}

export function getRankings(rankingsCallbackHandlerFn) {
    setTimeout(() => rankingsCallbackHandlerFn(rankings), DELAY_MS);
}

export function evaluateHand(playerName, playerHand, didWinHandlerCallbackFn) {
    // todo: replace calculation of didWin and update rankings while doing so.
    // optional: in local-mode (isConnected == false) store rankings in the browser localStorage https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
    const didWin = Boolean(Math.floor(Math.random() * 2));
    setTimeout(() => didWinHandlerCallbackFn(didWin), DELAY_MS);
}

*/
