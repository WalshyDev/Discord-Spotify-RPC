const DiscordRPC = require('discord-rpc'),
	nodeSpotifyWebhelper = require('node-spotify-webhelper'),
	spotify = new nodeSpotifyWebhelper.SpotifyWebHelper(),
	config = require('./config.json');

const ClientId = config.clientId || "384286107036155904";
const imageKey = config.largeImageKey || "spotify";
const imageText = config.largeImageText || undefined;

const rpc = new DiscordRPC.Client({
	transport: 'ipc'
});

const timeMode = config.time || 'overall';
var startTimestamp = new Date();
var songName = undefined;

async function updateActivity() {
	if (!rpc) return;
	if (startTimestamp && config.time === 'none') startTimestamp = undefined;

	spotify.getStatus(function(err, res) {
		if (err) return console.error(err);
		if (res.track.track_resource && res.track.track_resource.name && res.track.track_resource.name != songName) {
			if (config.time === 'song-time') {
				startTimestamp = new Date(new Date() - (res.playing_position * 1000));
			}
			songName = res.track.track_resource.name;
			rpc.setActivity({
				details: `Playing ${res.track.track_resource.name}`,
				state: `By ${res.track.artist_resource.name}`,
				startTimestamp,
				largeImageKey: imageKey,
				largeImageText: imageText,
				instance: false,
			});
			console.log(`[${new Date().toLocaleTimeString()}] Updated Rich Presence - ${res.track.track_resource.name}`)
		}
	})
}

rpc.on('ready', () => {
	console.log(`Starting with clientId ${ClientId}`);
	updateActivity();
	setInterval(() => {
		updateActivity();
	}, 60e3);
});

rpc.login(ClientId).catch(console.error);
