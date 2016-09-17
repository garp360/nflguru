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
        		games : function(NflGuruFactory, season, week) {
        			return NflGuruFactory.loadWeekly(season, week);
        		},
	        	stats : function(NflGuruFactory, season, week) {
	        		return NflGuruFactory.loadWeeklyStats(season, week-1);
	        	},
	        	allStats : function(NflGuruFactory, season, week) {
	        		return NflGuruFactory.loadWeeklyStats(season, 0);
	        	},
	        	matchups : function(games, stats, week, allStats) {
	        		var statMap = {};
	        		
	        		angular.forEach(stats, function(stat){
	        			statMap[stat.$id] = {
	        				offense: stat.offense,
	        				defense: stat.defense
	        			}
	        		});
	        		
	        		if(week < 6) {
	        			var multiplier = week-1;//Math.floor(17 / (week * 2));
	        			console.log("multiplier = " + multiplier);
	        			angular.forEach(allStats, function(baseStats){
	        				//console.log(baseStats.$id)
	        				var currentStats = statMap[baseStats.$id];
	        				var currentDefense = currentStats.defense;
	        				var currentOffense = currentStats.offense;
	        				var baseOffense = baseStats.offense;
	        				var baseDefense = baseStats.defense;
	        				
	        				//console.log(currentStats + "|" + currentDefense + "|" + baseOffense  + "|" + baseDefense);
	        				//mergeOffense
	        				for ( var property in baseOffense) 
	        				{
	        					//console.log(property);
	        					if (baseOffense.hasOwnProperty(property) && currentOffense.hasOwnProperty(property) && !isNaN(parseFloat(currentOffense[property])) && isFinite(currentOffense[property]) && !isNaN(parseFloat(baseOffense[property])) && isFinite(baseOffense[property])) {
	        						//console.log("[current] " + property + "[" + currentOffense[property] + "] [ * " + (currentOffense[property] * multiplier) + "]");
	        						//console.log("[base] " + property + "[" + baseOffense[property] + "]");

	        						currentOffense[property] =  (((currentOffense[property] * multiplier) + baseOffense[property])/(multiplier+1)).toFixed(2);
	        						//console.log("[current-modified] " + property + "[" + currentOffense[property] + "]");
	        					}
	        				}
	        				//mergeDefense
	        				for ( var property in baseDefense) 
	        				{
	        					//console.log(property);
	        					if (baseDefense.hasOwnProperty(property) && currentDefense.hasOwnProperty(property) && !isNaN(parseFloat(currentDefense[property])) && isFinite(currentDefense[property]) && !isNaN(parseFloat(baseDefense[property])) && isFinite(baseDefense[property])) {
	        						//console.log("[current] " + property + "[" + currentDefense[property] + "] [ * " + (currentDefense[property] * multiplier) + "]");
	        						//console.log("[base] " + property + "[" + baseDefense[property] + "]");
	        						
	        						currentDefense[property] =  (((currentDefense[property] * multiplier) + baseDefense[property])/(multiplier+1)).toFixed(2);
	        						//console.log("[current-modified] " + property + "[" + currentDefense[property] + "]");
	        					}
	        				}

		        		});
	        		}
	        		
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

