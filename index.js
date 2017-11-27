const DiscordRPC = require('discord-rpc');
const ClientId = "384795814859636736";
const rpc = new DiscordRPC.Client({ transport: 'ipc' });
var currentSong = "";

async function updateActivity() {
	if (!rpc)
    	return;

		var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync(`${process.env.APPDATA}\\Google Play Music Desktop Player\\json_store\\playback.json`, 'utf8'));
    console.log(obj["song"]["title"]);

		rpc.setActivity({
		details: `Playing ${obj["song"]["title"]}`,
		state: `By ${obj["song"]["artist"]}`,
		largeImageKey: 'gpm',
		instance: false,
	});
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
