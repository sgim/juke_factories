'use strict';

juke.factory('PlayerFactory', function(){
	// var currentSong;
	
  	var currentSong = null;
  	var currentAlbum = null;
	var audio = document.createElement('audio');
	var pause = function (song) {
	    song.playing = false;
	    audio.pause();
  	};
  	var play = function(song){
	    song.playing = true;
	    // resume current song
	    if (song === currentSong) {return audio.play()};
	    // enable loading new song
  		currentSong && (currentSong.playing = false);
	    currentSong = song;
	    audio.src = song.audioUrl;
	    audio.load();
	    audio.play();
  	};
  	var toggle = function(song){
	    if (song.playing) (pause(song));
	    else play(song);
	    
  	};
  	var next = function(){
  		// currentSong.albumIndex+1;

  	};
  	var prev = function(song){
  		
  	}
  	var setAlbum = function(album){
  		currentAlbum = album;
  	}
  return {  	
  	start: function(){
  		
  	},
  	pause: pause,
  	play: play,
  	toggle: toggle,
  	next: next,
  	prev: prev,
  	setAlbum: setAlbum,
  	getCurrentSong: function(){
  		return currentSong;
  	}
  }

})

// function skip (interval) {
//     if (!$scope.currentSong) return;
//     var index = $scope.currentSong.albumIndex;
//     index = mod( (index + (interval || 1)), $scope.album.songs.length );
//     $scope.currentSong = $scope.album.songs[index];
//     if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
//   };
  		// audio.addEventListener('ended', function () {
  //   $scope.next();
  //   // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });https://github.com/sgim/juke_factories.git
  // audio.addEventListener('timeupdate', function () {
  //   $scope.progress = 100 * audio.currentTime / audio.duration;
  //   // $scope.$digest(); // re-computes current template only (this scope)
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });}
  // }