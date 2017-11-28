const DiscordRPC = require('./DiscordRPC')
const SpotifyWebHelper = require('./SpotifyWebHelper')

const REFRESH_RATE = 15

const discord = new DiscordRPC()
const spotify = new SpotifyWebHelper()

const updateActivity = () => {
    spotify.getPlayingStatus()
        .then(() => discord.connect())
        .then(() => spotify.getTrackInfo())
        .then(track => {
            if (track.name && track.artist) {
                discord.updateStatus(track)
            } else {
                discord.disconnect()
            }
        })
        .catch(err => {
            if (err.code === 'ECONNREFUSED') {
                console.log('[ERR!] Spotify not running!')
            } else {
                console.log(err)
            }
            discord.disconnect()
        })
}

updateActivity()
const tick = setInterval(updateActivity, REFRESH_RATE * 1000)

process.on('exit', () => {
    discord.disconnect()
})