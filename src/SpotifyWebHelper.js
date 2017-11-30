const nodeSpotifyWebhelper = require('node-spotify-webhelper')

/**
 * Fallback config if no config is passed in
 */
const DEFAULT_CONFIG = {
    port: 4381,
    protocol: 'http'
}

class SpotifyWebHelper {

    constructor(config) {
        this.config = config || DEFAULT_CONFIG
        this.spotify = new nodeSpotifyWebhelper.SpotifyWebHelper(config)
    }

    /**
     * Gets the track info from Spotify
     * @returns {Promise<Track>}
     */
    getTrackInfo() {
        return new Promise((resolve, reject) => {
            this.spotify.getStatus((err, res) => {
                if (err) {
                    return reject(err)
                }
                if (!res.track.track_resource || !res.track.artist_resource) {
                    return reject('Track info invalid!', res.track)
                } else {
                    return resolve({
                        name: res.track.track_resource.name,
                        artist: res.track.artist_resource.name,
                    })
                }
            })
        })
    }

    /**
     * Gets the playing status of Spotify client
     * @returns {Promise<null>}
     */
    getPlayingStatus() {
        return new Promise((resolve, reject) => {
            this.spotify.getStatus((err, res) => {
                if (err) {
                    return reject(err)
                }
                if (res.playing) {
                    return resolve()
                } else {
                    return reject('Not playing anything')
                }
            })
        })
    }
    
}

module.exports = SpotifyWebHelper
