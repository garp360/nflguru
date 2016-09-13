(function() {
    'use strict';

    angular
    	.module('hb.nflguru')
    	.directive('toolbar', function() {
    		return {
				restrict: 'AE',
				replace: 'true',
				scope: { project: '=' },
			    templateUrl: 'view/toolbar.html',
			    link: function(scope)  { }
    		};
    	});
})();