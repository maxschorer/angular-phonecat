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

	$scope.range = range;


	chart['xAxis'] = {
	    categories: range,
	    title: {
		text: 'Episodes'
	    }
	};
	
    });

    $http.get('data/chars.json').success(function(jsonData) {
	$scope.chars = jsonData;

	chart['series']  = [{
	    name: 'TYRION',
	    data: jsonData[0]['words_by_ep']
	}];

	$scope.chart = chart;

    });

    
});