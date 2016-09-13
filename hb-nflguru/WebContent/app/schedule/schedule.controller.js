(function() {
	'use strict';

	angular.module('hb.nflguru').controller('ScheduleController', ScheduleController);

	ScheduleController.$inject = [ '$log', '$scope', '$stateParams', '$location', 'season', 'week' ];

	function ScheduleController($log, $scope, $stateParams, $location, season, week) {

		$scope.season = season;
		$scope.week = week;
		$scope.getDay = formatDay;
		$scope.getTime = formatTime;
		
		function formatDay(longdate) {
			return moment(longdate).format('h:mmA');
		}
		
		function getTime(longdate) {
			return moment(longdate).format('ddd').toUpperCase();
		}
	}
})();