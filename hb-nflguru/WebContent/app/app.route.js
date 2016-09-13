(function() {
	'use strict';

	angular.module('hb.nflguru')

	.config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider

		.state('home', {
			url : '/',
			templateUrl : 'view/home.html',
			controller : 'HomeController',
			resolve : {
				seasonStart : function() {
					return moment("09-06-2016", "MM-DD-YYYY").milliseconds(0).seconds(0).minutes(0).hours(0);
				},
				season : function(seasonStart) {
					return parseInt(seasonStart.format('YYYY'));
				},
				today : function() {
					return moment().milliseconds(0).seconds(0).minutes(0).hours(0);
				},
				week : function(seasonStart, today) {
					var tDayOfYear = today.dayOfYear();
					var sDayOfYear = seasonStart.dayOfYear();
					var week = parseInt(((tDayOfYear - sDayOfYear) / 7)) + 1;
					week = week == 0 ? 1 : week;
					return week;
				},
				games : function(AppFactory) {
					return AppFactory.getThisWeeksPicks();
				}
			}
		}).state('login', {
			url : '/login',
			templateUrl : 'view/login.html'
		}).state('schedule', {
			url : '/schedule/{week:int}',
			controller : 'ScheduleController',
			templateUrl : 'view/schedule.html',
			resolve : {
				seasonStart : function() {
					return moment("09-06-2016", "MM-DD-YYYY").milliseconds(0).seconds(0).minutes(0).hours(0);
				},
				season : function(seasonStart) {
					return parseInt(seasonStart.format('YYYY'));
				},
				today : function() {
					return moment().milliseconds(0).seconds(0).minutes(0).hours(0);
				},
				dynaweek : [ '$stateParams', function($stateParams) {
					return $stateParams.week;
				} ],
				week : function(seasonStart, today, dynaweek) {
					var week = dynaweek;
					if(week < 1) {
						var tDayOfYear = today.dayOfYear();
						var sDayOfYear = seasonStart.dayOfYear();
						week = parseInt(((tDayOfYear - sDayOfYear) / 7)) + 1;
						week = week == 0 ? 1 : week;
					}
					return week;
				},
				games : function(AppFactory, season, week) {
					return AppFactory.loadWeekly(season, week);
				}
			}
		}).state('spreads', {
			url : '/spreads',
			templateUrl : 'view/spreads.html'
		}).state('picks', {
			url : '/picks',
			templateUrl : 'view/picks.html'
		});
	} ]);

})();
