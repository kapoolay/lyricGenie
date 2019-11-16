/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        STATE/VARIABLES
~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const songListElement = document.getElementById('songList');


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        RENDER FUNCTION
~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

document.addEventListener('DOMContentLoaded', function () {
    function renderSongList(songsArray, element) {
        songListHTML = songsArray.map(function (track) {
            const trackString = JSON.stringify(track);
            return `
            <div class="searchResult">
                <h2><b>Song Title:</b> ${track.trackName}</h2><br>
                <h2 ><b>Artist:</b> ${track.artistName}</h2>
                <button class="lyricButton" onclick="getLyrics(event)" data-track='${JSON.stringify(track)}' data-trackId='${track.trackId}' data-artistId='${track.artistId}'>Get Lyrics</button>
            </div>
            <br>
            <br>
            <br>
            `
        })
        element.innerHTML = songListHTML.join('');
    }

    //Form Submit Listener - search button for the songs
    document.getElementById('search-form').addEventListener('submit', function (event) {
        event.preventDefault();
        // console.log('button is working');

        let searchString = document.getElementById('search-bar').value;
        console.log(searchString);

        //FUNCTION TO GET LIST OF SONGS USING SUBMITTED LYRICS
        axios.get('https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=' + searchString + '&apikey=a311818244ac163b84e06d86a8ec727f').then(function (response) {
            // console.log(response.data.message.body.track_list);
            const trackList = response.data.message.body.track_list
            // console.log(trackList)
            const trackNamesWithIds = trackList.map(trackObj => ({ trackName: trackObj.track.track_name, artistName: trackObj.track.artist_name, artistId: trackObj.track.artist_id, trackId: trackObj.track.track_id }))
            console.log(trackNamesWithIds)
            renderSongList(trackNamesWithIds, songListElement);
        })

    });
});



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          FUNCTIONS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const getLyrics = (event) => {
    const track = JSON.parse(event.target.dataset.track);
    axios.get('https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + track.trackId + '&apikey=a311818244ac163b84e06d86a8ec727f').then(function (response) {
        let lyrics = response.data.message.body.lyrics.lyrics_body
        // console.log(lyrics);

        var loadLyrics = document.getElementById('lyricsPlace');
        loadLyrics.innerHTML = lyrics;
    });
    console.log(track)
    axios.get('https://cors-anywhere.herokuapp.com/https://www.googleapis.com/youtube/v3/search?part=id&q=' + track.trackName + '&type=video&key=AIzaSyBO4BaHG8PaML9x_Y00pWhVQ44eB7uVdNk').then(function (response) {
        console.log(response);
        let videoIdTwo = response.data.items[0].id.videoId;
        console.log("video is working");
        console.log(videoIdTwo);
        // const videoIdTwo = getVideoId(track)
        console.log(videoIdTwo + 'this is the one')
        const videoHtml = getVideoEmbed(videoIdTwo)
        $("#audioVideo").html(videoHtml)
    });
};


// function getVideoEmbed (videoId) {
//     return `
//     <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="100" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
// }


function getVideoEmbed (videoId) {
    console.log(`https://www.youtube.com/watch?v=${videoId}`)
    return `
    <div>
    <a href="https://www.youtube.com/watch?v=${videoId}"><button type="button" class="videoButton">See the video!</button></a>
    </div>`
}
