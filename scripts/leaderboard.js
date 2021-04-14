import {Player} from './player.js'

export const leaderboard = {

    localPlayers: [],
    serverPlayers: [], // for testat part 2

    addPlayer: function(player, mode) {
        // check mode in the future
        this.localPlayers.push(player)
    },

    getPlayer: function(mode) {
        // check mode in the future
        return this.localPlayers
    },

    checkPlayer: function(player, mode) {
        // check mode in the future
        const p = this.localPlayers.find(player)
        return p ? p : null
    },

    checkPlayerName: function(name, mode) {
        // check mode in the future
        for (const player of this.localPlayers) {
            if (player.nickname === name) {
                return player
            }
        }
        return null
    },

    sortPlayers: function(a, b) {
        if (a.score < b.score) {
            return 1
        } else if (a.score > b.score) {
            return -1
        }
        return 0
    }

}