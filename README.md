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
By default the time option is `song-time` which will display the elapsed time as the current song time.

Available options  

| Option | Description |
| --- | --- |
| `overall` | This will set the elapsed time to the current track position. Thanks to @mcao for PRing this. |
| `song-time` | Show file differences that **haven't been** staged |
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
