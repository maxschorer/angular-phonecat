
/*jslint smarttabs:true */

var maxblog = angular.module('maxblog', ['highcharts-ng']);

maxblog.controller('MaxBlogCtrl', function ($scope, $http) {
    'use strict';
    delete $http.defaults.headers.common['X-Requested-With'];

    $scope.chartConfig = {
	options: {

	    chart: {
		type: 'line'
	    }
	},
	title: {
	    text: 'Dialogue Tracker (# Words / Episode)',
	    x: -20
	},
	credits: {
	    enabled: true
	},
	loading: false,
	yAxis: {
	    title: {
		text: '# Words'
	    },
	    plotLines: [{
		value: 0,
		width: 1,
		color: '#808080'
	    }],
	    min: 0
	},
	legend: {
	    layout: 'horizontal',
	    align: 'center',
	    verticalAlign: 'bottom',
	    borderWidth: 0
	},
	series: []
    };

    $scope.updateChart = function(character){
	if (!character.checked){
	    //remove character from chart
	    for (var i=0; i < $scope.chartConfig.series.length; i++){
		if($scope.chartConfig.series[i].name == character.code){
		    $scope.chartConfig.series.splice(i,1);
		    break;
		}
	    }

	} else {
	    // add character to chart
	    $scope.chartConfig.series.push(
		{
		    name: character.code,
		    data: character.rawCntByEp
		}
	    );

	}

    };

//    $http.get('https://rawgithub.com/maxschorer/maxblog-frontend/master/app/data/episodes.json').success(function(jsonData) {
    $http.get('app/data/episodes.json').success(function(jsonData) {
	$scope.episodes = jsonData;

	var range = [];
	var episode_codes = [];
	for (var i = 0; i < $scope.episodes.length; i++){
	    range.push(i);
	    var episode = $scope.episodes[i];
	    var code = episode.season_num + "." + episode.episode_num;
	    episode_codes.push(code);
	}

	$scope.episode_range = range;
	$scope.episode_codes = episode_codes;

	$scope.chartConfig.xAxis = {
	    title: {
		text: 'Episode'
	    },
	    x: -20,
	    categories: $scope.episode_codes
	};

    });

    //$http.get('https://rawgithub.com/maxschorer/maxblog-frontend/master/app/data/full.json').success(function(jsonData) {
    $http.get('app/data/full.json').success(function(jsonData) {
	$scope.characters = jsonData;

	$scope.characters[0].checked = true;
	for (var i=1; i < $scope.characters.length; i++){
	    $scope.characters[i].checked = false;
	}

	$scope.updateChart($scope.characters[0]);

    });



});
