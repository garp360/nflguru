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
		factory.saveSpreads = saveSpreads;
		
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
		
		function saveSpreads(games,week) {
			var deferred = $q.defer();
			var promises = [];
			angular.forEach(games, function(updatedGame){
			promises.push(loadGame(week, updatedGame.$id).then(function(game){
					game.spread = updatedGame.spread;
					game.$save();
				}));
			});
			
			$q.all(promises).then(function(){
				deferred.resolve(loadWeekly(week));				
			});
			
			return deferred.promise;
		}

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
			
			
			var hOffStatsLastYear = {};
			var hDefStatsLastYear = {};
			var vOffStatsLastYear = {};
			var vDefStatsLastYear = {};
			var hOffStatsThisYear = {};
			var hDefStatsThisYear = {};
			var vOffStatsThisYear = {};
			var vDefStatsThisYear = {};
			var hScore = null;
			var vScore = null;
			var pSpread = 999;
			var homeFieldAdvantageHome = 1.5;
			var homeFieldAdvantageVisitor = -1;
			
			loadOffenseStatsByYearAndTeam("2014", gameToSave.home).then(function(homeOffStats){
				hOffStatsLastYear = homeOffStats;
				return loadOffenseStatsByYearAndTeam("2014", gameToSave.visitor);
			}).then(function(visitorOffStats){
				vOffStatsLastYear = visitorOffStats;
				return loadDefenseStatsByYearAndTeam("2014", gameToSave.home);
			}).then(function(homeDefStats){
				hDefStatsLastYear = homeDefStats;
				return loadDefenseStatsByYearAndTeam("2014", gameToSave.visitor);
			}).then(function(visitorDefStats){
				vDefStatsLastYear = visitorDefStats;
				return loadOffenseStatsByYearAndTeam("2015", gameToSave.home);
			}).then(function(homeOffStats){
				hOffStatsThisYear = homeOffStats;
				return loadOffenseStatsByYearAndTeam("2015",  gameToSave.visitor);
			}).then(function(visitorOffStats){
				vOffStatsThisYear = visitorOffStats;
				return loadDefenseStatsByYearAndTeam("2015", gameToSave.home);
			}).then(function(homeDefStats){
				hDefStatsThisYear = homeDefStats;
				return loadDefenseStatsByYearAndTeam("2015", gameToSave.visitor);
			}).then(function(visitorDefStats){
				vDefStatsThisYear = visitorDefStats;
				return predictScore(hOffStatsThisYear, hOffStatsLastYear, vDefStatsThisYear, vDefStatsLastYear);
			}).then(function(predictedHomeScore){
				hScore = predictedHomeScore + homeFieldAdvantageHome;
				return predictScore(vOffStatsThisYear, vOffStatsLastYear, hDefStatsThisYear, hDefStatsLastYear);
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
		
		
		function loadOffenseStatsByYearAndTeam(year, team) {
			var ref = new Firebase("https://nflguru.firebaseio.com/statistics");
			return $firebaseObject(ref.child(year).child("offense").child(team.toUpperCase())).$loaded();
		};

		function loadDefenseStatsByYearAndTeam(year,team) {
			var ref = new Firebase("https://nflguru.firebaseio.com/statistics");
			return $firebaseObject(ref.child(year).child("defense").child(team.toUpperCase())).$loaded();
		};
		
		function predictScore(offenseThisYear, offenseLastYear, defenseThisYear, defenseLastYear) 
		{
			var deferred = $q.defer();
			var olMultiplier = 1;
			var otMultiplier = 1;
			var dlMultiplier = 1;
			var dtMultiplier = 1;
			var oPtsPerGame = ((offenseLastYear.avgPointsPerGame * olMultiplier) + (offenseThisYear.avgPointsPerGame * otMultiplier)) / (olMultiplier + otMultiplier);
			var dPtsPerGame = ((defenseLastYear.avgPointsPerGame * dlMultiplier) + (defenseThisYear.avgPointsPerGame * dtMultiplier)) / (dlMultiplier + dtMultiplier);
			
			var score = oPtsPerGame + ((dPtsPerGame - oPtsPerGame)/2);
			
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
			var spread = value.toString();
			if(value.indexOf(".") >= 0) 
			{
				var split = value.split(".");
				var integer = parseInt(split[0]);
				var decimal = parseInt(split[1].substring(0, 1));
				
				if(decimal >= 3 && decimal <= 7) 
				{
					decimal = "5"; 
				} 
				else 
				{
					decimal = "0"; 
				}
				
				var number = integer + "." + decimal;
				
				spread = parseFloat(number).toFixed(1);
			} 
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
