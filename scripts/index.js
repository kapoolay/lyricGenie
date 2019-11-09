document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('button is working');

        let searchString = document.getElementById('search-bar').value;
        console.log(searchString);

        axios.get('https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=' + searchString +'&apikey=a311818244ac163b84e06d86a8ec727f').then(function(response) {
            console.log(response);
        })
    });
});
