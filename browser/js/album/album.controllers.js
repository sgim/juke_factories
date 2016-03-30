'use strict';

juke.controller('AlbumCtrl', function($scope, $http, $rootScope, $log, AlbumFactory, PlayerFactory) {
  $scope.album;
  $scope.currentSong;
  $scope.playing;
  $scope.visible = false;
  var getAlbum = function(albumId){
   //  AlbumFactory.fetchById(albumId)
  	// .then(function(album) {
  		$scope.album = AlbumFactory.fetchById(albumId);
      PlayerFactory.setAlbum($scope.album);
  	// })
   //  .catch($log.error);
  }
  // load our initial data
  $rootScope.$on('changeView', function(e, view){
    $scope.visible = view === "album";
  })
  $rootScope.$on('changeAlbum', function(e,album){
    getAlbum(album._id);
  })



  $scope.toggle = function(song){
    $scope.currentSong = song;
    PlayerFactory.toggle(song);
    $rootScope.$evalAsync();
  };


});

//   // a "true" modulo that wraps negative to the top of the range
//   function mod (num, m) { return ((num % m) + m) % m; };

//   // jump `interval` spots in album (negative to go back, default +1)
//   
//   function next () { skip(1); };
//   function prev () { skip(-1); };

// });


juke.controller("AlbumsCtrl", function($scope, $rootScope, $log, AlbumFactory) {
  $scope.visible = true;
	AlbumFactory.fetchAll
	.then(function (albums) {
		$scope.albums = albums;
	})
  .catch($log.error);
  // $scope.albums = AlbumFactory.fetchAll;
  $rootScope.$on('changeView', function(e, view){
    $scope.visible = view === "albums";
  })

  $scope.changeAlbum = function(album){
    // $scope.visible = false;
    $rootScope.$emit("changeView", "album");
    $rootScope.$broadcast('changeAlbum', album);
  }



});
