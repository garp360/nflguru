(function() {
    'use strict';

    angular
    	.module('hb.nflguru')
    	.directive('navbar', function() {
    		return {
				restrict: 'AE',
				replace: 'true',
				scope: { project: '=' },
			    templateUrl: 'view/header.html',
			    link: function(scope)  { }
    		};
    	});
})();