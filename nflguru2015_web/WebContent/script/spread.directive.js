(function() {
    
	'use strict';

    angular
    	.module('hb.nflguru')
    	.directive('spread', function() {
    		return {
				restrict: 'AE',
				replace: 'true',
				scope: { game: '=' },
			    templateUrl: 'view/template/spread.tpl.html',
			    link: function(scope)  { }
    		};
    	});
})();