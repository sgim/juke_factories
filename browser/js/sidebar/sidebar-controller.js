'use strict';

juke.controller('Sidebar', function($rootScope, $scope){
	$scope.showAlbums = function(){
		$rootScope.$broadcast('changeView', "albums");
	}
	$scope.viewAllArtists = function(){
		$rootScope.$broadcast('changeView', "artists");
	}
})