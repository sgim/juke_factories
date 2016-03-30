'use strict';

juke.controller('PlayerCtrl', function (PlayerFactory, $scope, $rootScope) {
	$scope.getCurrentSong = PlayerFactory.getCurrentSong;
	$scope.playing = function(){
		var song = $scope.getCurrentSong();
		return song && song.playing;
	};
	$scope.toggle = PlayerFactory.toggle;
	$scope.next = PlayerFactory.next;
	$scope.prev = PlayerFactory.prev;
  // initialize audio player (note this kind of DOM stuff is odd for Angular)



  // functionality


  // outgoing events (to Album… or potentially other characters)
  

});
