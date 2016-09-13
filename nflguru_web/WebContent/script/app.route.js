(function() {
	'use strict';
	
	angular.module('hb.nflguru')
	
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) 
	{
		$urlRouterProvider.otherwise('/');
 
		$stateProvider
		
		.state('dashboard', 
		{
        	url:'/',
    		templateUrl: 'view/dashboard.html',
    		controller: 'AppController',
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
        		},
	        	stats : function(NflGuruFactory, season, week) {
	        		return NflGuruFactory.loadWeeklyStats(season, week-1);
	        	},
	        	matchups : function(games, stats) {
	        		var statMap = {};
	        		
	        		angular.forEach(stats, function(stat){
	        			statMap[stat.$id] = {
	        				offense: stat.offense,
	        				defense: stat.defense
	        			}
	        		});
	        		
	        		var matchups = [];
	        		angular.forEach(games, function(game) {
	        	
	        			matchups.push({
	        				game: game,
	        				stats : {
	        					home : {
	        						team: game.home,
	        						offense: statMap[game.home].offense,
	        						defense: statMap[game.home].defense
	        					},
			        			visitor : {
			        				team: game.visitor,
	        						offense: statMap[game.visitor].offense,
	        						defense: statMap[game.visitor].defense
			        			}
	        				}
	        			});
	        		});
	        		return matchups;
	        	}
        	}
		});
	}]); 
	
})();

