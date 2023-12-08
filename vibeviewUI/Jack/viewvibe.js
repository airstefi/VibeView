function openSide(){
    document.getElementById("sidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeSide(){
    document.getElementById("sidebar").style.width = "0px";
    document.getElementById("main").style.marginLeft = "0px";
}

// Add these changes to your JavaScript file

// Function to parse the access token from the URL hash
function getAccessTokenFromUrl() {
  const hashParams = window.location.hash.substr(1).split('&');
  const params = {};
  hashParams.forEach(param => {
    const [key, value] = param.split('=');
    params[key] = value;
  });
  return params.access_token;
}

// Function to fetch currently playing information and update the page
function updateCurrentlyPlaying(accessToken) {
  getCurrentlyPlaying(accessToken); // Initial update

  // Set up an interval to update the information every 10 seconds (adjust as needed)
  setInterval(function () {
    getCurrentlyPlaying(accessToken);
  }, 10000); // 10 seconds (10000 milliseconds)
}

// Function to fetch currently playing information from Spotify API
function getCurrentlyPlaying(accessToken) {
  fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('API Response:', data); // Log the API response for debugging

    if (data && data.is_playing) {
      const trackName = data.item.name;
      const artistName = data.item.artists[0].name;
      const albumName = data.item.album.name;

      console.log('Currently Playing:', `${trackName} by ${artistName}, Album: ${albumName}`); // Log currently playing details

      document.getElementById('nowPlaying').innerHTML = `
        <div style="display: table-row">
          <div style="display: table-cell; width: 100px;padding:10px">
          <img crossorigin="anonymous" src="${data.item.album.images[0].url.replace(/^http:\/\//i, 'https://')}" style="height: 100px; width: 100px;">

          </div>
          <div style="display: table-cell; float: left">
            <h3>Now Playing:<br>${trackName} by ${artistName}<br>Album: ${albumName}</h3>
          </div>
        </div>
      `;
    } else {
      console.log('Nothing is playing right now...'); // Log when nothing is playing

      document.getElementById('nowPlaying').innerHTML = '<h2>Nothing is playing right now!</h2>';
    }
  })
  .catch(error => console.error('Error fetching currently playing:', error));
}

// Check if there's an access token in the URL hash
const accessToken = getAccessTokenFromUrl();

// If there's an access token, you can use it to make requests to the Spotify API
if (accessToken) {
  // You can store the access token or use it to make requests to the Spotify API
  console.log('Access Token:', accessToken);

  // Update currently playing information dynamically
  updateCurrentlyPlaying(accessToken);
}
