(function() {
    'use strict';

    angular
    	.module('hb.nflguru')
    	.controller('AppController', AppController); 
    
    	AppController.$inject = ['$log', '$scope', 'games', 'week', 'stats', 'matchups'];
    	
    	function AppController($log, $scope, games, week, stats, matchups){
			$scope.week = week;
			$scope.games = games;
			$scope.matchups = matchups;
			$scope.hasSpread = isNumeric;
			
			$scope.gametime = function(longdate) {
				return moment(longdate).format('h:mmA');
			}
			
			$scope.gameday = function(longdate) {
				return moment(longdate).format('ddd').toUpperCase();
			}
			
			$scope.updateSpread = function(matchup) {
				angular.forEach(games, function(game) {
					if(game.id === matchup.game.id) {
						game.spread = matchup.game.spread;
						game.stats = matchup.stats;
						game.prediction = _prognosticate(matchup);
						console.log(game);
						games.$save(game);
					}
				})
			}

			$scope.poolpick = function(matchup, teamName) {
				angular.forEach(games, function(game) {
					if(game.id === matchup.game.id) {
						if (game.prediction.visitor.team === teamName) {
							game.prediction.visitor.selected = matchup.game.prediction.visitor.selected;
							game.prediction.home.selected = game.prediction.visitor.selected ? false : null;
						} 
						if  (game.prediction.home.team === teamName) {
							game.prediction.home.selected = matchup.game.prediction.home.selected;
							game.prediction.visitor.selected = game.prediction.home.selected ? false : null;
						} 
						console.log(game);
						games.$save(game);
					}
				})
			}
			
			function _prognosticate(matchup) {
				var prediction = {};
				if(isNumeric(matchup.game.spread)) {
					var hpts = _getScore(matchup.stats.home.offense, matchup.stats.visitor.defense, true);
					var vpts = _getScore(matchup.stats.visitor.offense, matchup.stats.home.defense, false);
					var diff = _getDifferential(hpts, vpts, matchup.game.spread);
					var pick = _getPick(hpts, vpts, matchup.game);
					prediction = {
						home : {
							team : matchup.game.home,
							pts : hpts
						},
						visitor: {
							team : matchup.game.visitor,
							pts : vpts
						},
						differential: diff,
						pick : pick
					}
				} else {
					prediction = null;
				}
				return prediction;
			}
			
			function _getScore(offense, defense, homeAdvantage) {
				var homeAdvantageMultiplier = homeAdvantage ? 2 : 1;
				
				var opts = Math.round((offense.avgPointsPerGame *  homeAdvantageMultiplier) + 1);
				var dpts = Math.round(defense.avgPointsPerGame + 1);
				
				return Math.round(((opts + dpts) / (homeAdvantageMultiplier + 1) + 1));
			}
			
			function _getDifferential(home, visitor, spread) {
				return Math.abs(spread - ((home - visitor) * -1));
			}

			function _getPick(hpts, vpts, game) {
				var spread = game.spread;
				var homeIsWinner = (hpts > vpts) && spread > 0;
				var pick = homeIsWinner ? game.home : game.visitor;
				//console.log(pick);
				return pick;
			}
			
			function isNumeric(n) {
				return !isNaN(parseFloat(n)) && isFinite(n);
			}
			
    	};
})();