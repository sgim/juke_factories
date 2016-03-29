juke.factory('StatsFactory', function ($q) {
	var statsObj = {};
	statsObj.totalTime = function (album) {
		var audio = document.createElement('audio');
		return $q(function (resolve, reject) {
			var sum = 0;
			var n = 0;
			function resolveOrRecur () {
				if (n >= album.songs.length) resolve(sum);
				else audio.src = album.songs[n++].audioUrl;
			}
			audio.addEventListener('loadedmetadata', function () {
				sum += audio.duration;
				resolveOrRecur();
			});
			resolveOrRecur();
		});
	};
	return statsObj;
});

juke.factory("AlbumFactory", function ($http, StatsFactory, $log) {
	
	function getData (res) { return res.data; }

		return {
			fetchAll: function () {
        return $http.get("/api/albums/")
					.then(getData)
					.then(function (albums) {
					  albums.forEach(function(album) {
						  album.imageUrl = "/api/albums/" + album._id + ".image";
						});
						return albums;
					})
					.catch($log.error);
			},
			fetchById: function (id) {
        return $http.get("api/albums/" + id)
					.then(getData)
					.then(function (album) {
						album.imageUrl = "/api/albums/" + id + ".image";
						album.songs.forEach(function (song, i) {
							song.audioUrl = '/api/songs/' + song._id + '.audio';
							song.albumIndex = i;
						});
						return StatsFactory.totalTime(album).then(function (sum) {
							album.name += " (" +  (sum / 60 | 0) + ")";
							return album;
						})
					})
					.catch($log.error); // $log service can be turned on and off; also, pre-bound
			}
		}

});