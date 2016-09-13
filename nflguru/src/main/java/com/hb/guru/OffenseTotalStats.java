package com.hb.guru;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;

public class OffenseTotalStats
{
	private BigInteger rank;
	private String teamName;
	private BigInteger totalGamesPlayed;
	private BigDecimal avgPointsPerGame;
	private BigInteger totalPointsScored;
	private BigInteger totalPlaysFromScrimmage;
	private BigDecimal avgOverallYardsGainedPerGame;
	private BigDecimal avgOverallYardsGainedPerPlay;
	private BigDecimal avgFirstDownsGainedPerGame;
	private BigInteger totalThirdDownsMade;
	private BigInteger totalThirdDownsAttempted;
	private BigInteger totalFourthDownsMade;
	private BigInteger totalFourthDownsAttempted;
	private BigInteger totalPenalties;
	private BigInteger totalPenaltyYards;
	private BigInteger avgTimeOfPosessionMinutes;
	private BigInteger avgTimeOfPosessionSeconds;
	private BigInteger totalFumbles;
	private BigInteger totalFumblesLost;
	private BigInteger totalTurnovers;
	
	
	public void saveValue(StatFieldIndex index, String value) {
		switch (index)
		{
			case rank:
				this.rank = new BigInteger(value);
				break;
			case teamName:
				this.teamName = value;
				break;
			case totalGamesPlayed:
				this.totalGamesPlayed = new BigInteger(value);
				break;
			case avgPointsPerGame:
				this.avgPointsPerGame = new BigDecimal(value).setScale(2, RoundingMode.DOWN);
				break;
			case totalPointsScored:
				this.totalPointsScored = new BigInteger(value);
				break;
			case totalPlaysFromScrimmage:
				this.totalPlaysFromScrimmage = new BigInteger(value);
				break;
			case avgOverallYardsGainedPerGame:
				this.avgOverallYardsGainedPerGame = new BigDecimal(value).setScale(2, RoundingMode.DOWN);
				break;
			case avgOverallYardsGainedPerPlay:
				this.avgOverallYardsGainedPerPlay = new BigDecimal(value).setScale(2, RoundingMode.DOWN);
				break;
			case avgFirstDownsGainedPerGame:
				this.avgFirstDownsGainedPerGame = new BigDecimal(value).setScale(2, RoundingMode.DOWN);
				break;
			case totalThirdDownsMade:
				this.totalThirdDownsMade = new BigInteger(value);
				break;
			case totalThirdDownsAttempted:
				this.totalThirdDownsAttempted = new BigInteger(value);
				break;
			case totalFourthDownsMade:
				this.totalFourthDownsMade = new BigInteger(value);
				break;
			case totalFourthDownsAttempted:
				this.totalFourthDownsAttempted = new BigInteger(value);
				break;
			case totalPenalties:
				this.totalPenalties = new BigInteger(value);
				break;
			case totalPenaltyYards:
				this.totalPenaltyYards = new BigInteger(value);
				break;
			case avgTimeOfPosession:
				String[] time = value.split(":");
				this.avgTimeOfPosessionMinutes = new BigInteger(time[0]);
				this.avgTimeOfPosessionSeconds = new BigInteger(time[1]);
				break;
			case totalFumbles:
				this.totalFumbles = new BigInteger(value);
				break;
			case totalFumblesLost:
				this.totalFumblesLost = new BigInteger(value);
				break;
			case totalTurnovers:
				this.totalTurnovers = new BigInteger(value);
				break;
			default:
				break;
		}
	}
	
	public BigInteger getRank()
	{
		return rank;
	}
	public void setRank(BigInteger rank)
	{
		this.rank = rank;
	}
	public String getTeamName()
	{
		return teamName;
	}
	public void setTeamName(String teamName)
	{
		this.teamName = teamName;
	}
	public BigInteger getTotalGamesPlayed()
	{
		return totalGamesPlayed;
	}
	public void setTotalGamesPlayed(BigInteger totalGamesPlayed)
	{
		this.totalGamesPlayed = totalGamesPlayed;
	}
	public BigDecimal getAvgPointsPerGame()
	{
		return avgPointsPerGame;
	}
	public void setAvgPointsPerGame(BigDecimal avgPointsPerGame)
	{
		this.avgPointsPerGame = avgPointsPerGame;
	}
	public BigInteger getTotalPointsScored()
	{
		return totalPointsScored;
	}
	public void setTotalPointsScored(BigInteger totalPointsScored)
	{
		this.totalPointsScored = totalPointsScored;
	}
	public BigInteger getTotalPlaysFromScrimmage()
	{
		return totalPlaysFromScrimmage;
	}
	public void setTotalPlaysFromScrimmage(BigInteger totalPlaysFromScrimmage)
	{
		this.totalPlaysFromScrimmage = totalPlaysFromScrimmage;
	}
	public BigDecimal getAvgOverallYardsGainedPerGame()
	{
		return avgOverallYardsGainedPerGame;
	}
	public void setAvgOverallYardsGainedPerGame(BigDecimal avgOverallYardsGainedPerGame)
	{
		this.avgOverallYardsGainedPerGame = avgOverallYardsGainedPerGame;
	}
	public BigDecimal getAvgOverallYardsGainedPerPlay()
	{
		return avgOverallYardsGainedPerPlay;
	}
	public void setAvgOverallYardsGainedPerPlay(BigDecimal avgOverallYardsGainedPerPlay)
	{
		this.avgOverallYardsGainedPerPlay = avgOverallYardsGainedPerPlay;
	}
	public BigDecimal getAvgFirstDownsGainedPerGame()
	{
		return avgFirstDownsGainedPerGame;
	}
	public void setAvgFirstDownsGainedPerGame(BigDecimal avgFirstDownsGainedPerGame)
	{
		this.avgFirstDownsGainedPerGame = avgFirstDownsGainedPerGame;
	}
	public BigInteger getTotalThirdDownsMade()
	{
		return totalThirdDownsMade;
	}
	public void setTotalThirdDownsMade(BigInteger totalThirdDownsMade)
	{
		this.totalThirdDownsMade = totalThirdDownsMade;
	}
	public BigInteger getTotalThirdDownsAttempted()
	{
		return totalThirdDownsAttempted;
	}
	public void setTotalThirdDownsAttempted(BigInteger totalThirdDownsAttempted)
	{
		this.totalThirdDownsAttempted = totalThirdDownsAttempted;
	}
	public BigInteger getTotalFourthDownsMade()
	{
		return totalFourthDownsMade;
	}
	public void setTotalFourthDownsMade(BigInteger totalFourthDownsMade)
	{
		this.totalFourthDownsMade = totalFourthDownsMade;
	}
	public BigInteger getTotalFourthDownsAttempted()
	{
		return totalFourthDownsAttempted;
	}
	public void setTotalFourthDownsAttempted(BigInteger totalFourthDownsAttempted)
	{
		this.totalFourthDownsAttempted = totalFourthDownsAttempted;
	}
	public BigInteger getTotalPenalties()
	{
		return totalPenalties;
	}
	public void setTotalPenalties(BigInteger totalPenalties)
	{
		this.totalPenalties = totalPenalties;
	}
	public BigInteger getTotalPenaltyYards()
	{
		return totalPenaltyYards;
	}
	public void setTotalPenaltyYards(BigInteger totalPenaltyYards)
	{
		this.totalPenaltyYards = totalPenaltyYards;
	}
	public BigInteger getAvgTimeOfPosessionMinutes()
	{
		return avgTimeOfPosessionMinutes;
	}
	public void setAvgTimeOfPosessionMinutes(BigInteger avgTimeOfPosessionMinutes)
	{
		this.avgTimeOfPosessionMinutes = avgTimeOfPosessionMinutes;
	}
	public BigInteger getAvgTimeOfPosessionSeconds()
	{
		return avgTimeOfPosessionSeconds;
	}
	public void setAvgTimeOfPosessionSeconds(BigInteger avgTimeOfPosessionSeconds)
	{
		this.avgTimeOfPosessionSeconds = avgTimeOfPosessionSeconds;
	}
	public BigInteger getTotalFumbles()
	{
		return totalFumbles;
	}
	public void setTotalFumbles(BigInteger totalFumbles)
	{
		this.totalFumbles = totalFumbles;
	}
	public BigInteger getTotalFumblesLost()
	{
		return totalFumblesLost;
	}
	public void setTotalFumblesLost(BigInteger totalFumblesLost)
	{
		this.totalFumblesLost = totalFumblesLost;
	}
	public BigInteger getTotalTurnovers()
	{
		return totalTurnovers;
	}
	public void setTotalTurnovers(BigInteger totalTurnovers)
	{
		this.totalTurnovers = totalTurnovers;
	}

	@Override
	public String toString()
	{
		StringBuilder builder = new StringBuilder();
		builder.append("TotalYardsStats [rank=").append(rank).append(", teamName=").append(teamName).append(", totalGamesPlayed=").append(totalGamesPlayed).append(", avgPointsPerGame=").append(avgPointsPerGame).append(", totalPointsScored=").append(totalPointsScored)
				.append(", totalPlaysFromScrimmage=").append(totalPlaysFromScrimmage).append(", avgOverallYardsGainedPerGame=").append(avgOverallYardsGainedPerGame).append(", avgOverallYardsGainedPerPlay=").append(avgOverallYardsGainedPerPlay)
				.append(", avgFirstDownsGainedPerGame=").append(avgFirstDownsGainedPerGame).append(", totalThirdDownsMade=").append(totalThirdDownsMade).append(", totalThirdDownsAttempted=").append(totalThirdDownsAttempted).append(", totalFourthDownsMade=")
				.append(totalFourthDownsMade).append(", totalFourthDownsAttempted=").append(totalFourthDownsAttempted).append(", totalPenalties=").append(totalPenalties).append(", totalPenaltyYards=").append(totalPenaltyYards).append(", avgTimeOfPosessionMinutes=")
				.append(avgTimeOfPosessionMinutes).append(", avgTimeOfPosessionSeconds=").append(avgTimeOfPosessionSeconds).append(", totalFumbles=").append(totalFumbles).append(", totalFumblesLost=").append(totalFumblesLost).append(", totalTurnovers=").append(totalTurnovers)
				.append("]");
		return builder.toString();
	}
	
	
}
