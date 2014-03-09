'use strict'; // what's the purpose of this?

var maxblog = angular.module('maxblog', ['chartsExample.directives']);
 
maxblog.controller('MaxBlogCtrl', function ($scope, $http) {
    
    var chart = {
	title: {
            text: 'Game of Thrones-  Word Count Dashboard',
            x: -20 //center
	},
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
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
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


	chart['xAxis'] = {
	    categories: range,
	    title: {
		text: 'Episodes'
	    }
	};
	
    });

    $http.get('data/chars.json').success(function(jsonData) {
	$scope.chars = jsonData;

	var range = [];

	for (var i = 0; i < jsonData.length; i++){
	    range.push(i);
	}

	chart['series']  = [{
	    name: jsonData[0]['name'],
	    data: jsonData[0]['words_by_ep']
	}];

	$scope.chart = chart;
	$scope.char_range = range;

	$scope.display = jsonData[0];

    });

    $scope.changeDisplay = function(charName){
	var ind;
	for (var i=0; i < $scope.chars.length; i++){
	    if($scope.chars[i]['name'] == charName){
		ind = i;
		break;
	    }
	}
	$scope.display = $scope.chars[ind];
	$scope.chart.series = [{
	    name: $scope.chars[ind]['name'],
	    data: $scope.chars[ind]['words_by_ep']
	}]	    
    }

    
});