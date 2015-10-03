(function() {
	'use strict';
	
	angular.module('hb.nflguru')
	
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) 
	{
		$urlRouterProvider.otherwise('/');
 
		$stateProvider
		
		.state('dashboard', 
		{
        	url:'/dash',
    		templateUrl: 'view/dashboard.html',
    		controller: function($scope, $log, week, games, NflGuruFactory) {
    			$scope.week = week;
    			$scope.games = games;
    			$scope.activeGame = {};
    			$scope.showUpdater = false;
    			$scope.showFinalizer = false;
    			
    			$scope.gameday = gameday;
    			$scope.gametime = gametime;
    			$scope.spread = spread;
    			$scope.updateSpread = updateSpread;
    			$scope.finalize = finalize;
    			$scope.closeUpdater = closeUpdater;
    			$scope.closeFinalizer = closeFinalizer;
    			$scope.refresh = refresh;
    			$scope.pickTeam = pickTeam;
    			$scope.pickDiff = pickDiff;
    			$scope.actualDiff = actualDiff;
    			$scope.pickThisGame = pickThisGame;
    				
    			function gameday(game){
    				return moment(game.longdate).format("ddd, MMM Do");
    			};
    			
    			function gametime(game) {
    				return moment(game.longdate).format("h:mm A");
    			};

    			function spread(spread) {
    				var value = "---";
    				if(spread && spread != 999){
    					value = spread;
    				}
    				return value;
    			};
    			
    			function updateSpread(id) {
    				NflGuruFactory.loadGame(week, id).then(function(g){
    					$scope.activeGame = g;
						$scope.showUpdater = true;
    				});
    			};
    			
    			function finalize(id) {
    				NflGuruFactory.loadGame(week, id).then(function(g){
    					$scope.activeGame = g;
						$scope.showFinalizer = true;
    				});
    			};
    			
    			function closeUpdater() {
    				NflGuruFactory.saveGame(week, $scope.activeGame).then(function(){
    					$scope.activeGame = {};
    					$scope.showUpdater = false;
    					$scope.showFinalizer = false;
    				});
    			};

    			function closeFinalizer() {
    				NflGuruFactory.finalizeGame(week, $scope.activeGame).then(function(){
    					$scope.activeGame = {};
    					$scope.showUpdater = false;
    					$scope.showFinalizer = false;
    				});
    			};
    			
    			$scope.areSpreadsIn = function(spread) {
    				return !(spread === 999);
    			};
    			
    			function refresh() {
    				angular.forEach($scope.games, function(game) {
    					NflGuruFactory.saveGame(week, game);
    				});
    			};
    			
    			function pickTeam(game) {
    				var team = game.home;
    				if(game.spread - game.predictedspread > 0) {
    					team = game.visitor;
    				}
    				
    				return team;
    			};

    			function pickDiff(game) {
    				var diff = game.spread - game.predictedspread;
    				return Math.abs(diff);
    			};

    			function actualDiff(game) {
    				return (game.actualscore.visitor - game.actualscore.home) * -1;
    			};
    			
    			function pickThisGame(game, selected) {
    				NflGuruFactory.pickGame(week, game.$id, selected);
    			};
    			
    			$scope.isGamePicked = function(game) {
    				var picked = false;
    				if(game.selected) {
    					picked = true;
    				}
    				return picked;
    			};
    			
    			$scope.gameIsOver = function(longdate) {
    				var now = moment();
    				var gametime = moment(new Date(longdate)).add(4, 'hours');
    				
    				return now.isAfter(gametime);
    				
    			};
    			
    			
    			$scope.outcome = function(game, spread) {
    				var outcome = "T";
    				
    				if(pickTeam(game) === game.visitor) {
    					outcome = getOutcome(game.actualscore.visitor, game.actualscore.home, (spread * -1));
    				} else {
    					outcome = getOutcome(game.actualscore.home, game.actualscore.visitor, spread);
    				}
    				
    				return outcome;
    			};

    			function getOutcome(fav, opp, spread) {
    				var outcome = "T";
    				if(fav - spread > opp) {
    					outcome = "W";
    				} else if (fav - spread < opp) {
    					outcome = "L";
    				}
    				return outcome;
    			};
    			
    			$scope.predictedDiff = function(game) {
    				return Math.abs(game.predictedspread - actualDiff(game));
    			};
    			
    		},
        	resolve : 
        	{
        		seasonStart : function() {
        			return moment("09-09-2015", "MM-DD-YYYY").milliseconds(0).seconds(0).minutes(0).hours(0);
        		},
        		today : function() {
        			return moment().milliseconds(0).seconds(0).minutes(0).hours(0);
        		},
        		week : function(seasonStart, today) {
        			var tDayOfYear = today.dayOfYear();
        			var sDayOfYear = seasonStart.dayOfYear();
					var week = parseInt(((tDayOfYear - sDayOfYear) / 7)) + 1;
        			return week;
        		},
        		games : function(NflGuruFactory, week) {
        			return NflGuruFactory.loadWeekly(week);
        		}
        	}
		}).state('spreads', 
		{
        	url:'/',
    		templateUrl: 'view/spreads.html',
    		controller: function($scope, $log, games, week, NflGuruFactory) {
    			
    			$scope.games = games;
    			
    			$scope.save = save;
    			
    			function save() 
    			{
    				NflGuruFactory.saveSpreads($scope.games, week).then(function(games){
    					$scope.games = games;
    				});
    			}
    			
    		},
        	resolve : 
        	{
        		seasonStart : function() {
        			return moment("09-09-2015", "MM-DD-YYYY").milliseconds(0).seconds(0).minutes(0).hours(0);
        		},
        		today : function() {
        			return moment().milliseconds(0).seconds(0).minutes(0).hours(0);
        		},
        		week : function(seasonStart, today) {
        			var tDayOfYear = today.dayOfYear();
        			var sDayOfYear = seasonStart.dayOfYear();
					var week = parseInt(((tDayOfYear - sDayOfYear) / 7)) + 1;
        			return week;
        		},
        		games : function(NflGuruFactory, week) {
        			return NflGuruFactory.loadWeekly(week);
        		}
        	}
		});
	}]); 
	
})();

