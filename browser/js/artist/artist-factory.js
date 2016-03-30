juke.factory('Artists', function($http){
	var getData = function(response){
		return response.data;
	}
	var fetchAll = $http.get('/api/artists')
	.then(getData)
	.then(function(artists){
		artists.forEach(function(artist){artists.visible = false;});
		return artists;
	});
	var fetchAlbumsByArtist = function(id){
		return $http.get('/api/artists/'+id+'/albums')
		.then(getData)
		.then(function(albums){
			albums.forEach(function (album) {
				album.imageUrl = "/api/albums/" + album._id + ".image";
			});
			return albums;
		})
	}
	var fetchSongsByArtist = function(id){
		return $http.get('/api/artists/'+id+'/songs')
		.then(getData)
		.then(function(songs){
			songs.forEach(function (song, i) {
				song.audioUrl = '/api/songs/' + song._id + '.audio';
				song.playing = false;
				song.albumIndex = i;
			});
			return songs;
		})
	}

	return {
		fetchAll: fetchAll,
		fetchAlbumsByArtist: fetchAlbumsByArtist,
		fetchSongsByArtist: fetchSongsByArtist
	}
})