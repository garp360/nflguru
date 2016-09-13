(function() {
	'use strict';

	angular.module('hb.nflguru')
	.factory('NflGuruFactory', NflGuruFactory);

	NflGuruFactory.$inject = [ '$q', '$log', '$firebaseArray', '$firebaseObject' ];

	function NflGuruFactory($q, $log, $firebaseArray, $firebaseObject) 
	{
		var factory = {};
		
		factory.loadWeekly = loadWeekly;
		factory.loadWeeklyStats = loadWeeklyStats;
		
		function loadWeekly(season, week) 
		{
			var ref = new Firebase("https://hb-nfl-guru.firebaseio.com" );
			return $firebaseArray(ref.child("games").child("S:" + season).orderByChild("week").equalTo(week)).$loaded();
		};
		
		function loadWeeklyStats(season, week) 
		{
			var ref = new Firebase("https://hb-nfl-guru.firebaseio.com");
			return $firebaseArray(ref.child("statistics").child("S:" + season).child("S:" + season + ":W:" + week)).$loaded();
		};

		return factory;
	};
})();


//function updateALl() 
//{
//	var ref = new Firebase("https://hb-nfl-guru.firebaseio.com");
//	$firebaseArray(ref.child("games")).$loaded().then(function(games){
//		angular.forEach(games, function(game){
//			game.longdate = moment(game.longdate).add(4, 'h').add(1, 'm').toISOString();
//			games.$save(game);
//		})
//	});
//};