// Set DEBUG environment value to log everything, even in production
process.env.DEBUG = 'app:*'

const child_process = require('child_process')
const path = require('path')
const debug = require('debug')

const DISCORD_RPC_MODULE_PATH = path.join(__dirname, './DiscordRPCSpawner.js')
const SpotifyWebHelper = require('./SpotifyWebHelper.js')

/**
 * Set up loggers
 */
const log = debug('app:main')
// log.log = console.log.bind(console)
const error = debug('app:error:main')

/**
 * Update frequency. Discord RPC has a limit of 15s max
 */
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

    /**
     * Initializes the main application
     */
    init() {
        this.spawnDiscordRpc()
        this.updateSpotifyStatus()
        this.tick = setInterval(() => this.updateSpotifyStatus(), REFRESH_RATE * 1000)        
    }

    /**
     * Handler that handles data being sent by the Discord RPC sub-process 
     * @param {Action} action 
     * @returns {void}
     */
    ipcCommunicationHandler(action) {
        switch (action.type) {
            case 'RPC_CONNECTION_FULFILLED':
                this.updateSpotifyStatus()
                break
            case 'RPC_CONNECTION_REJECTED':
                error('Failed to connect to Discord client')
                error('%o', action.payload)
                break
            default:
                error('Action undefined!')
        }
    }
    
    /**
     * Kills the Discord RPC sub-process
     * @returns {void}
     */
    killDiscordRpc() {
        if (!this.DISCORD_RPC_INSTANCE.killed) {
            log('Killing Discord RPC proccess...')
            this.DISCORD_RPC_INSTANCE.removeAllListeners()
            this.DISCORD_RPC_INSTANCE.kill()
            log('Discord RPC proccess killed!')            
        }
    }

    /**
     * Spawns a Discord RPC sub-process
     */
    spawnDiscordRpc() {
        if (!this.DISCORD_RPC_INSTANCE || this.DISCORD_RPC_INSTANCE.killed) {
            log('Spawning Discord RPC proccess...')
            this.DISCORD_RPC_INSTANCE = child_process.fork(DISCORD_RPC_MODULE_PATH)
            this.DISCORD_RPC_INSTANCE.on('message', (action) => this.ipcCommunicationHandler(action))
            log('Discord RPC proccess spawned!')                        
        }
    }

    /**
     * Updates RP with Spotify track
     * It will first check if anything is playing.
     * + If nothing is playing, it will kill the Discord RPC sub-process to hide RP in Discord
     * + If something is playing, it will fetch the data from Spotify, and dispatch the track data
     *   to the spawned Discord RPC sub-process
     */
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
                error('%o', e)
                this.killDiscordRpc()
            })
    }
}

const __main = new Main()
