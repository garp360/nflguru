(function() {
    'use strict';

    angular
    	.module('hb.nflguru')
    	.controller('AppToolbarController', AppToolbarController); 
    
    	AppToolbarController.$inject = [ '$log', '$scope', '$state', '$location' ];
    	
    	function AppToolbarController( $log, $scope, $state, $location ){
			
    		$scope.showSchedule = showSchedule;
    		$scope.showSpreads = showSpreads;
    		
    		function showSchedule() {
    			var week = currentWeek();
    			$state.go('schedule', {week: week});
    		}
    		
    		function showSpreads() {
    			var week = currentWeek();
    			$state.go('spreads', {week: week});
    		}
    		
    		function currentWeek() {
    			var seasonStart = moment("09-06-2016", "MM-DD-YYYY").milliseconds(0).seconds(0).minutes(0).hours(0);
    			var season = parseInt(seasonStart.format('YYYY'));
    			var today = moment().milliseconds(0).seconds(0).minutes(0).hours(0);
				var tDayOfYear = today.dayOfYear();
				var sDayOfYear = seasonStart.dayOfYear();
				var week = parseInt(((tDayOfYear - sDayOfYear) / 7)) + 1;
				week = week == 0 ? 1 : week;
				return week;
			}
    		
    	};
})();