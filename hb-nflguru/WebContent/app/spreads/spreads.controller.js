(function() {
	'use strict';

	angular.module('hb.nflguru').controller('SpreadsController', SpreadsController);

	SpreadsController.$inject = [ '$log', '$scope', '$stateParams', '$location', 'games' ];

	function SpreadsController($log, $scope, $stateParams, $location, games, week) {

		$scope.week = week;
		$scope.games = games;

		$scope.formatSpread = formatSpread;

		function formatSpread(spread) {
			var formattedSpread = spread;
			if (isNumeric(spread)) {
				var n = new Number(spread);
				formattedSpread = n.toFixed(1);
				if (spread.indexOf("-") < 0) {
					formattedSpread = "+" + formattedSpread;
				}
			}

			return formattedSpread;

		}

		function isNumeric(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}
	}
})();