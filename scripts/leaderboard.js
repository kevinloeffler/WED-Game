const leaderboard = {

    localPlayers: [],
    serverPlayers: [], // for testat part 2

    addPlayer(player) {
        this.localPlayers.push(player)
    },

    checkPlayerName(name) {
        // eslint-disable-next-line no-restricted-syntax
        for (const player of this.localPlayers) {
            if (player.nickname === name) {
                return player
            }
        }
        return null
    },

    sortPlayers(a, b) {
        if (a.score < b.score) {
            return 1
        }
        if (a.score > b.score) {
            return -1
        }
        return 0
    },
}

export default leaderboard
