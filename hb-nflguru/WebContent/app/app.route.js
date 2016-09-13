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
			templateUrl : 'view/schedule.html'
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
