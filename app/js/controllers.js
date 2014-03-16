/*jslint smarttabs:true */

var maxblog = angular.module('maxblog', ['highcharts-ng']);

maxblog.controller('MaxBlogCtrl', function ($scope, $http) {
    'use strict'; // what's the purpose of this?

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
	}
    };


    $http.get('data/episodes.json').success(function(jsonData) {
	$scope.episodes = jsonData;

	var range = [];
	for (var i = 1; i <= jsonData.length; i++){
	    range.push(i);
	}

	$scope.ep_range = range;

	$scope.chartConfig.xAxis = {
	    title: {
		text: 'Episodes'
	    },
	    categories: range
	};

    });


    $http.get('data/test10.json').success(function(jsonData) {
	$scope.chars = jsonData;

	var range = [];

	for (var i = 0; i < jsonData.length; i++){
	    range.push(i);
	}

	$scope.chartConfig.series = [
	    {
		name: jsonData[0].name,
		data: jsonData[0].raw_cnt_by_ep
	    }
	];

	$scope.chartConfig.subtitle = {
	    text: jsonData[0].name,
	    x: -20
	};

	$scope.char_range = range;
	$scope.display = [jsonData[0]];

    });


    $scope.addChar = function(charName){
	// See if person already in chart
	for (var d=0; d < $scope.display.length; d++){
	    if (charName == $scope.display[d].name) return;
	}

	var ind;
	for (var i=0; i < $scope.chars.length; i++){
	    if($scope.chars[i].name == charName){
		ind = i;
		break;
	    }
	}

	$scope.display.push($scope.chars[ind]);

	$scope.chartConfig.series.push(
	    {
		name: $scope.chars[i].name,
		data: $scope.chars[i].raw_cnt_by_ep
	    }
	);

    };


});
