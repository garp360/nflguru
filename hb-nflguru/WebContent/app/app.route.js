(function() {
	'use strict';

	angular.module('hb.nflguru')

	.config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider

		.state('home', {
			url : '/',
			views : {
				'' : {
					templateUrl : 'view/home.html',
					controller : 'HomeController',
					resolve : {
						games : function(AppFactory) {
							return AppFactory.getThisWeeksPicks();
						}
					}
				},
				'toolbar' : {
					templateUrl : 'view/toolbar.html',
					controller : 'AppToolbarController',
					resolve : {
						factoryMessage : function(AppFactory) {
							return AppFactory.test();
						}
					}
				}
			}
		})
		.state('login', {
			url : '/login',
			templateUrl : 'view/login.html'
		})
		.state('schedule', {
			url : '/schedule',
			templateUrl : 'view/schedule.html',
			resolve : 
        	{
        		seasonStart : function() {
        			return moment("09-08-2016", "MM-DD-YYYY").milliseconds(0).seconds(0).minutes(0).hours(0);
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
        		games : function(NflGuruFactory, season, week) {
        			return NflGuruFactory.loadWeekly(season, week);
        		}
        	}
		})
		.state('spreads', {
			url : '/spreads',
			templateUrl : 'view/spreads.html'
		})
		.state('picks', {
			url : '/picks',
			templateUrl : 'view/picks.html'
		});
	} ]);

})();
