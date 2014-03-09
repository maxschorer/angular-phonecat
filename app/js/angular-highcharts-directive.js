'use strict';
angular.module('chartsExample.directives',[])
    .directive('chart', function () {
	return {
	    restrict: 'E',
	    template: '<div></div>',
	    scope: {
		chartData: "=value"
	    },
	    transclude:true,
	    replace: true,
	    link: function (scope, element, attrs) {
		var chartsDefaults = {
		    chart: {
			renderTo: element[0],
			type: attrs.type || null,
			height: attrs.height || null,
			width: attrs.width || null
		    }
		};

		scope.$watch(function() { return scope.chartData.series; }, function(value) {
		    if(!value) return;
		    var deepCopy = true;
		    var newSettings = {};
		    $.extend(deepCopy, newSettings, chartsDefaults, scope.chartData);
		    var chart = new Highcharts.Chart(newSettings);
		    
		});

	    }
	};
    });