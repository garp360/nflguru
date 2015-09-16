package com.hb.guru;


public enum StatFieldIndex
{
	rank(0),
	teamName(1),
	totalGamesPlayed(2),
	avgPointsPerGame(3),
	totalPointsScored(4),
	totalPlaysFromScrimmage(5),
	avgOverallYardsGainedPerGame(6),
	avgOverallYardsGainedPerPlay(7),
	avgFirstDownsGainedPerGame(8),
	avgOverallYardsAllowedPerGame(6),
	avgOverallYardsAllowedPerPlay(7),
	avgFirstDownsAllowedPerGame(8),
	totalThirdDownsMade(9),
	totalThirdDownsAttempted(10),
	totalFourthDownsMade(12),
	totalFourthDownsAttempted(13),
	totalPenalties(15),
	totalPenaltyYards(16),
	avgTimeOfPosession(17),
	totalFumbles(18),
	totalFumblesLost(19),
	totalTurnovers(20);
	
	private final int columnIndex;

	private StatFieldIndex(int columnIndex)
	{
		this.columnIndex = columnIndex;
	}

	public int getColumnIndex()
	{
		return columnIndex;
	}

	public static StatFieldIndex findByColumnIndex(int index) {
		StatFieldIndex statFieldIndex = null;
		for (StatFieldIndex field : StatFieldIndex.values())
		{
			if(field.getColumnIndex() == index) {
				statFieldIndex = field;
				break;
			}
		}
		return statFieldIndex;
	}
}
