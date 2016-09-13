(function() {
	'use strict';

	angular.module('hb.nflguru')
	.factory('AppFactory', AppFactory);

	AppFactory.$inject = [ '$q', '$log', '$firebaseArray', '$firebaseObject' ];

	function AppFactory($q, $log, $firebaseArray, $firebaseObject) 
	{
		
		function getThisWeeksPicks() {
			var season = _getCurrentSeason();
			var week = _getCurrentWeek();
			return loadWeekly(season, week);
		}
		
		function loadWeekly(season, week) 
		{
			var ref = new Firebase("https://hb-nfl-guru.firebaseio.com" );
			return $firebaseArray(ref.child("games").child("S:" + season).orderByChild("week").equalTo(week)).$loaded();
		};
		
		function _getSeasonStart() {
			return moment("09-07-2016", "MM-DD-YYYY").milliseconds(0).seconds(0).minutes(0).hours(0);
		}
		
		function _getCurrentSeason() {
			return parseInt(_getSeasonStart().format('YYYY'));
		}
		
		function _getCurrentWeek() {
			var seasonStart = _getSeasonStart();
			var today = moment().milliseconds(0).seconds(0).minutes(0).hours(0);
			var tDayOfYear = today.dayOfYear();
			var sDayOfYear = seasonStart.dayOfYear();
			var week = parseInt(((tDayOfYear - sDayOfYear) / 7)) + 1;
			week = week == 0 ? 1 : week;
			return week;
		}
		
		function test() {
			return "Factory OK";
		}
		
		
		var factory = {};
		factory.getThisWeeksPicks = getThisWeeksPicks;
		factory.test = test;
		return factory;
	};
})();