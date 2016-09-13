(function() {
    'use strict';

    angular
    	.module('hb.nflguru')
    	.controller('AppHeaderController', AppHeaderController); 
    
    	AppHeaderController.$inject = [ '$log', '$scope', '$stateParams', '$location', 'factoryMessage' ];
    	
    	function AppHeaderController( $log, $scope, $stateParams, $location, factoryMessage ){
			
    		$scope.login = showLogin;
    		
    		function showLogin() {
    			$location.path('/login', false);
    		}
    		
    		
    	};
})();