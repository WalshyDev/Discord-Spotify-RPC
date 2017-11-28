const child_process = require('child_process')
const path = require('path')
const DISCORD_RPC_MODULE_PATH = path.join(__dirname, './DiscordRPCSpawner.js')
const SpotifyWebHelper = require('./SpotifyWebHelper.js')

const REFRESH_RATE = 15

class Main {
    constructor() {
        this.DISCORD_RPC_INSTANCE = null
        this.tick = null
        this.currentTrack = {
            name: null,
            artist: null,
        }        
        this.spotify = new SpotifyWebHelper()
        this.init()
    }

    init() {
        this.spawnDiscordRpc()
        this.updateSpotifyStatus()
        this.tick = setInterval(() => this.updateSpotifyStatus(), REFRESH_RATE * 1000)        
    }

    ipcCommunicationHandler(action) {
        switch (action.type) {
            case 'RPC_CONNECTION_FULFILLED':
                this.updateSpotifyStatus()
                break
            case 'RPC_CONNECTION_REJECTED':
                console.error('[ERR!] Failed to connect to Discord client')
                console.error(action.payload)
                break
            default:
                console.log('Action undefined!')
        }
    }
    killDiscordRpc() {
        if (!this.DISCORD_RPC_INSTANCE.killed) {
            console.log('[INFO] Killing Discord RPC proccess')
            this.DISCORD_RPC_INSTANCE.removeAllListeners()
            this.DISCORD_RPC_INSTANCE.kill()
            console.log('[SUCCESS] Discord RPC proccess killed')            
        }
    }
    spawnDiscordRpc() {
        if (!this.DISCORD_RPC_INSTANCE || this.DISCORD_RPC_INSTANCE.killed) {
            console.log('[INFO] Spawning Discord RPC proccess')            
            this.DISCORD_RPC_INSTANCE = child_process.fork(DISCORD_RPC_MODULE_PATH)
            this.DISCORD_RPC_INSTANCE.on('message', (action) => this.ipcCommunicationHandler(action))
            console.log('[SUCCESS] Discord RPC proccess spawned')                        
        }
    }
    updateSpotifyStatus() {
        this.spotify.getPlayingStatus()
            .then(() => this.spawnDiscordRpc())
            .then(() => this.spotify.getTrackInfo())
            .then(track => {
                if (this.currentTrack.name !== track.name || this.currentTrack.artist !== track.artist) {
                    this.DISCORD_RPC_INSTANCE.send({
                        type: 'UPDATE_STATUS',
                        payload: track
                    })
                    this.currentTrack = track
                }
            })
            .catch((e) => {
                console.log(e)
                this.killDiscordRpc()
            })
    }
}

const __main = new Main()
