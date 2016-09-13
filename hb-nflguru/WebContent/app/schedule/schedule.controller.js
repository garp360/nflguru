(function() {
	'use strict';

	angular.module('hb.nflguru').controller('ScheduleController', ScheduleController);

	ScheduleController.$inject = [ '$log', '$scope', '$stateParams', '$location', 'season', 'week', 'games' ];

	function ScheduleController($log, $scope, $stateParams, $location, season, week, games) {

		$scope.season = season;
		$scope.week = week;
		$scope.games = games;
		$scope.getTime = formatTime;
		
		
		function formatTime(longdate) {
			return moment(longdate).format('h:mmA');
		}
	}
})();