var maxblog = angular.module('maxblog', []);
 
maxblog.controller('MaxBlogCtrl', function ($scope, $http) {
    $http.get('data/episodes.json').success(function(data) {
	$scope.episodes = data;

	var range = [];
	for (var i = 0; i < data.length; i++){
	    range.push(i);
	}

	$scope.range = range;
    });

   $http.get('data/chars.json').success(function(data) {
	$scope.chars = data;
    });

});