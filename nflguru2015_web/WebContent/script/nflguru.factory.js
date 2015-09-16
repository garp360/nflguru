(function() {
	'use strict';

	angular.module('factory.module').factory('NflGuruFactory', NflGuruFactory);

	NflGuruFactory.$inject = [ '$q', '$log', '$firebaseArray', '$firebaseObject' ];

	function NflGuruFactory($q, $log, $firebaseArray, $firebaseObject) {
		var factory = {};
		
		factory.loadWeekly = loadWeekly;
		factory.loadGame = loadGame;
		factory.saveGame = saveGame;
		factory.pickGame = pickGame;
		factory.finalizeGame = finalizeGame;
		
		function loadWeekly(week) 
		{
			var ref = new Firebase("https://nflguru.firebaseio.com/schedule/2015");
			return $firebaseArray(ref.child(week)).$loaded();
		};

		function loadGame(week, gameId) 
		{
			var ref = new Firebase("https://nflguru.firebaseio.com/schedule/2015");
			return $firebaseObject(ref.child(week).child(gameId)).$loaded();
		};

		function pickGame(week, gameId, selected) {
			var deferred = $q.defer();
			loadGame(week, gameId).then(function(game){
				game.selected = selected;
				return game.$save();
			}).then(function(game) {
				deferred.resolve(game);
			});
			return deferred.promise;
		};
		
		function finalizeGame(week, gameToSave) {
			var deferred = $q.defer();
			loadGame(week, gameToSave.$id).then(function(game){
				game.actualscore.visitor = gameToSave.actualscore.visitor;
				game.actualscore.home = gameToSave.actualscore.home;
				return game.$save();
			}, function(err) {
				deferred.reject(err);
			}).then(function(game){
				deferred.resolve(game);
			}, function(err) {
				deferred.reject(err);
			});
			
			return deferred.promise;
			
		};
		
		
		function saveGame(week, gameToSave) {
			var deferred = $q.defer();
			var hOffStats = {};
			var hDefStats = {};
			var vOffStats = {};
			var vDefStats = {};
			var hScore = null;
			var vScore = null;
			var pSpread = 999;
			var homeFieldAdvantageHome = 1.5;
			var homeFieldAdvantageVisitor = -1;
			
			loadOffenseStats(gameToSave.home).then(function(homeOffStats){
				hOffStats = homeOffStats;
				return loadOffenseStats(gameToSave.visitor);
			}).then(function(visitorOffStats){
				vOffStats = visitorOffStats;
				return loadDefenseStats(gameToSave.home);
			}).then(function(homeDefStats){
				hDefStats = homeDefStats;
				return loadDefenseStats(gameToSave.visitor);
			}).then(function(visitorDefStats){
				vDefStats = visitorDefStats;
				return predictScore(hOffStats, vDefStats);
			}).then(function(predictedHomeScore){
				hScore = predictedHomeScore + homeFieldAdvantageHome;
				return predictScore(vOffStats, hDefStats);
			}).then(function(predictedVisitorScore){
				vScore = predictedVisitorScore + homeFieldAdvantageVisitor;
				return predictSpread(hScore, vScore);
			}).then(function(predictedSpread){
				pSpread = predictedSpread;
				return loadGame(week, gameToSave.$id);
			}).then(function(game) {
				var fav = gameToSave.home;
				
				if(gameToSave.spread < 0) {
					fav = gameToSave.visitor;
				}
			
				game.spread = gameToSave.spread,
				game.favorite = fav,
				game.predictedscore = {
						home: roundScore(hScore),
						visitor: roundScore(vScore)
				};
				game.predictedspread = pSpread;
				
				return game.$save();
			}, function(err) {
				deferred.reject(err);
			}).then(function(game){
				deferred.resolve(game);
			}, function(err) {
				deferred.reject(err);
			});
			
			return deferred.promise;
		}
		
		
		function loadOffenseStats(team) {
			var ref = new Firebase("https://nflguru.firebaseio.com/statistics/2014/offense");
			return $firebaseObject(ref.child(team.toUpperCase())).$loaded();
		};

		function loadDefenseStats(team) {
			var ref = new Firebase("https://nflguru.firebaseio.com/statistics/2014/defense");
			return $firebaseObject(ref.child(team.toUpperCase())).$loaded();
		};
		
		function predictScore(offense, defense) {
			var deferred = $q.defer();
			var score = offense.avgPointsPerGame + ((defense.avgPointsPerGame - offense.avgPointsPerGame)/2);
			
			deferred.resolve(score);
			
			return deferred.promise;
		}

		function predictSpread(h, v) {
			var deferred = $q.defer();
			var spread = (h - v) + "";
			spread = roundSpread(spread);
			
			deferred.resolve(spread);
			
			return deferred.promise;
		}
		
		function roundSpread(value) {
			var spread = value + "";
			if(spread.indexOf(".") >= 0) {
				var split = spread.split(".");
				if(parseInt(split[1]) >= 5) {
					spread = split[0] + "." + "5"; 
				} else {
					spread = split[0] + "." + "0"; 
				}
			}
			spread = parseFloat(spread).toPrecision(1);
			return spread;
		}
		
		function roundScore(value) {
			var score = parseInt(value);
			
			if(((value - score) * 10) >=5) {
				score += 1;
			}
			
			return score;
		}
		
		return factory;
	};
})();
