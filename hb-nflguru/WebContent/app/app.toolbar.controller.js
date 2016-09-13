(function() {
    'use strict';

    angular
    	.module('hb.nflguru')
    	.controller('AppToolbarController', AppToolbarController); 
    
    	AppToolbarController.$inject = [ '$log', '$scope', '$stateParams', '$location', 'week' ];
    	
    	function AppToolbarController( $log, $scope, $stateParams, $location, week ){
			
    		$scope.week = week;
    		
    		
    	};
})();