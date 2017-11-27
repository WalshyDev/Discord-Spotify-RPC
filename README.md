# Install
Download the zip, extract to a directory then open CMD in that directory and run `npm i` and let npm install the packages.

# Setup
Sadly some libs haven't been updated in a while to apply some fixes so you will need to edit 2 files in order for this to work. Go to the node_modules folder and look for these folders. For example node_modules/wintools

## wintools
Edit the /lib/ps.js so line 11 has a maxBuffer. Here is the new line 11 `exec('wmic process list /format:csv', {maxBuffer: 2000*1024}, function (err, stdout, stderr) {`

## node-spotify-webhelper

NOTE: These steps are for Linux users only. Windows users should skip these steps as these are unnecessary. 

You need to edit 2 lines here, line 15 the DEFAULT_PORT var, change the value to 4381. Next go to line 158 and change the `https://%s:%d%s` to `http://%s:%d%s`

With them 2 files edited you should be good to go.

# How to run
Run `npm start` in console after the setup steps and boom! Rich Presence with your Spotify!

# Configure

## Time option (elapsed time)
By default the time option is `song-time` which will display the elapsed time as the current song time.

Available options  

| Option | Description |
| --- | --- |
| `overall` | This will set the elapsed time to the amount of time Spotify/this script has been running. |
| `song-time` | This will set the elapsed time to the current track position. Thanks to @mcao for PRing this. |
| `none` | Remove the elapsed time and just show the "Playing {track}\nBy {artist}" |

Just go to the config.json and change the "time" to any of these.
Example:
```json
{
    "time": "none"
}
```
Result:  
![none](https://bots.are-pretty.sexy/4eae08.png)

## Client ID
TODO: Document on how to make your own application and upload an asset

## Image and image text
If you want to have some text above the Spotify icon when you hover over it you can do this with a simple config option! You can also change the image easily now without having to edit the JS if you have made your own application.

You can now use the `largeImageKey` and `largeImageText` to change these values. **Note** If you have not made your own applicaiton do **not** change the `largeImageKey` this will result in just a black image.

Example of the new values:
```json
{
	"largeImageText": "Walshy is cool"
}
```
Result:  
![none](https://bots.are-pretty.sexy/be34ec.png)