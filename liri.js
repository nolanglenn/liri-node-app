// Required node packages and API keys
require("dotenv").config();

const fs = require('fs');
const axios = require("axios");
const moment = require('moment')
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');

const spotify = new Spotify(keys.spotify);

// BandsInTown API call with axios
let searchBandsInTown = artist => {
    artist = process.argv.slice(3).join(" ");

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                let momentDate = moment(response.data[i].datetime);
                console.log(`
============================================
Venue name: ${response.data[i].venue.name}
Venue location: ${response.data[i].venue.city}, ${response.data[i].venue.country}
Date of event: ${momentDate.format('MM-DD-YYYY')}
============================================
                            `);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

// node-spotify-API calls
let spotifySong = song => {
    song = process.argv.slice(3).join(" ");
    
    // Checks if the user gave a song
    if (!song) {
        song = "The Sign, Ace of Base";
    }

    spotify
        .search({ type: 'track', query: song, limit: 1})
        .then(function(response) {
            console.log(`
=====================================
Artist: ${response.tracks.items[0].artists[0].name}
Song: ${response.tracks.items[0].name}
Link: ${response.tracks.items[0].external_urls.spotify}
Album: ${response.tracks.items[0].album.name}
=====================================
                        `);
        })
        .catch(function(err) {
            console.log(err);
        });
}

// OMDB API calls
let findMovie = movie => {
    movie = process.argv.slice(3).join(" ");

    // Checks to see if user gave a movie
    if (!movie) {
        movie = "Mr. Nobody";
    }

    axios.get("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            console.log(`
============================================
Movie: ${response.data.Title}
Year released: ${response.data.Year}
IMDB rating: ${response.data.imdbRating}
Rotton Tomatoes rating: ${response.data.Ratings[1].Value}
Country: ${response.data.Country}
Language: ${response.data.Language}
Plot: ${response.data.Plot}
Actors: ${response.data.Actors}
============================================
                        `);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// let readFile = () => {
//     fs.readFile('./random.txt', function read(err, data) {
//         if (err) {
//             throw err;
//         }
        
//         let dataArr = data.split(",");
//         // console.log(dataArr);
//     }
// };

// Checking user unput after 'node {filname}
if (process.argv[2] === "concert-this") {
    searchBandsInTown();
} else if (process.argv[2] === "spotify-this-song") {
    spotifySong();
} else if (process.argv[2] === "movie-this") {
    findMovie();
} else if (process.argv[2] === "do-what-it-says") {
    readFile();
} else {
    console.log(`
                Please enter a valid search command:
                -------------------------------------
                concert-this
                spotify-this-song
                move-this
                do-what-it-says
                -------------------------------------
                `)
}