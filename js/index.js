(function(global) {
  'use strict';

  var response;


  // get song from spotify's API

  var getSong = function (id){
    var xhr = new XMLHttpRequest();
    //var idString = id.toString();
    var url = "https://api.spotify.com/v1/tracks/" + id;
    xhr.open('GET', url);

    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function() {
      if (this.status === 200) { // the result is OK
        response = JSON.parse(this.response);
        console.log('onload response', response);
        setingData(response);
        playSong(response);
        statusBar(response);
      }
   };
   xhr.send();
  } ;

 /* var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.spotify.com/v1/tracks/2Foc5Q5nqNiosCNqttzHof');

  xhr.setRequestHeader('Accept', 'application/json');

  xhr.onload = function() {
    if (this.status === 200) { // the result is OK
      response = JSON.parse(this.response);
      console.log('onload response', response);
      setingData(response);
      playSong(response);
      statusBar(response);
    }
  };

  xhr.send(); */

  var setingData = function(response) {
    // set up the data of the player
    var albumName = response.album.name;
    var albumCover = response.album.images[0].url;
    var songName = response.name;
    var authorName = response.artists[0].name;

    $('.title').text(songName);
    $('.author').text(authorName);
    $('.btn-play').removeClass('disabled');
    $('.cover').children([0]).attr('src', albumCover);

  };

  // play song
  var playSong = function(response) {
    var songUrl = response.preview_url;
    $('#audio').attr('src', songUrl);

    $('#playbutton').on('click', function() {
      $(this).toggleClass('playing');

      if ($(this).hasClass('playing'))
        document.getElementById('audio').play();
      else
        document.getElementById('audio').pause();
    });
  };

  var statusBar = function(response){

    // Duration of the song
    var duration = response.duration_ms;
    $('progress').attr('max', duration);

    $('#audio').on('timeupdate', function(event){
      var time = document.getElementById('audio').currentTime;

      $('progress').attr('value', time*1000);
    });

  };


  var selectSong = function(){

    $('button').on('click', function(event){
      //funcion que captura el id del input field en forma de string
      getSong();
    });

    

  }; 

})(window);