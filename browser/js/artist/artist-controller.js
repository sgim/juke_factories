juke.controller('artistsController', function($rootScope, $scope, Artists){
	$scope.visible = false;
	$rootScope.$on('changeView', function(e, view){
		$scope.visible = view === 'artists';
	});
	Artists.fetchAll.then(function(artists){
		$scope.artists = artists;
	});
	$scope.viewOneArtist = function(artist){
		$rootScope.$broadcast('changeView', 'artist');
		$rootScope.$broadcast('setArtist', artist);
	
	}
})

juke.controller('artistController', function($rootScope, $scope, Artists, PlayerFactory){
	$scope.visible = false;
	$rootScope.$on('changeView', function(e, view){
		$scope.visible = view === 'artist';
	});
	$rootScope.$on('setArtist', function(e, artist){
		$scope.artist = artist;
		Artists.fetchAlbumsByArtist(artist._id).then(function(albums){
			$scope.albums = albums;
		});
		Artists.fetchSongsByArtist(artist._id).then(function(songs){
			$scope.songs = songs;
		});
	});
	$scope.toggle = function(song){
	    PlayerFactory.toggle(song);
	    $rootScope.$evalAsync();
	};
})