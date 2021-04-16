const leaderboard = {

    localPlayers: [],
    serverPlayers: [], // for testat part 2

    addPlayer(player, /*mode*/) {
        // check mode in the future
        this.localPlayers.push(player)
    },

    checkPlayerName(name, /*mode*/) {
        // check mode in the future
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
