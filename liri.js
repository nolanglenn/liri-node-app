// Required node packages and API keys
require("dotenv").config();

const axios = require("axios");
const moment = require('moment')
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');

const spotify = new Spotify(keys.spotify);

// BandsInTown API call with axios
let searchBandsInTown = artist => {
    artist = process.argv[3];
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                let momentDate = moment(response.data[i].datetime);
                console.log(`
                            ============================================
                            Venue name: ${response.data[i].venue.name}
                            Venue location: ${response.data[i].venue.city}, ${response.data[i].venue.country}
                            Date of event: ${momentDate.format('MM-DD-YYYY')}
                            ============================================`);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

let spotifySong = song => {
    spotify
        .search({ type: 'track', query: song, limit: 1})
        .then(function(response) {
            console.log(response.tracks.items.album);
        })
        .catch(function(err) {
            console.log(err);
        });
}

// Checking user unput after 'node {filname}
if (process.argv[2] === "concert-this") {
    searchBandsInTown();
} else if (process.argv[2] === "spotify-this-song") {
    spotifySong('all the small things');
} else {
    console.log(`Please enter a valid search command:
                -------------------------------------
                concert-this
                spotify-this-song
                move-this
                do-what-it-says`)
}