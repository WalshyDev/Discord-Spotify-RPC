const DiscordRPC = require('discord-rpc'),
	nodeSpotifyWebhelper = require('node-spotify-webhelper'),
	spotify = new nodeSpotifyWebhelper.SpotifyWebHelper(),
	config = require('./config.json');

const ClientId = "384286107036155904";

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const timeMode = config.time || 'overall';
var startTimestamp = new Date();
var currentSong = "";

async function updateActivity() {
	if (!rpc)
    	return;

    if(startTimestamp && config.time === 'none'){
    	startTimestamp = undefined;
    }
    
    spotify.getStatus(function(err, res) {
    	if(err) {
    		return console.error(err);
    	}
    	if(res.track.track_resource && res.track.track_resource.name){
	    	if(config.time === 'song-time'){
	    		startTimestamp = new Date(new Date() - (res.playing_position * 1000));
	    	}
	    	currentSong = res.track.track_resource.name;

	    	rpc.setActivity({
				details: `Playing ${currentSong}`,
				state: `By ${res.track.artist_resource.name}`,
				startTimestamp,
				largeImageKey: 'spotify',
				instance: false,
			});
			console.log(`[${new Date().toLocaleTimeString()}] Updated RPC rich presence - ${res.track.track_resource.name}`)
		}
    })
}

rpc.on('ready', () => {
	console.log(`Starting with clentId ${ClientId}`);

	updateActivity();

	// activity can only be set every 15 seconds
	setInterval(() => {
		updateActivity();
	}, 15e3);
});

rpc.login(ClientId).catch(console.error);