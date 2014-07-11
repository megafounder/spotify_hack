(function (global) {
  'use strict';

var response;

// get song from spotify's API
	var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.spotify.com/v1/tracks/7Bxv0WL7UC6WwQpk9TzdMJ');

    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function () {
      if (this.status === 200) { // the result is OK
        response = JSON.parse(this.response);
        console.log('onload response', response);
        handleResponse(response);
      }
    };

    xhr.send();

// show song

	var handleResponse = function(response) {

		var albumName = response.album.name;
		var songName = response.name;
		var authorName = response.artists[0].name;


		$('.title').text(songName);
		$('.author').text(authorName);


	};
	

})(window);