package com.hb.guru;

public class TeamStats
{
	private OffenseTotalStats offense;
	private DefenseTotalStats defense;
	
	
	public TeamStats(OffenseTotalStats offense, DefenseTotalStats defense)
	{
		this.offense = offense;
		this.defense = defense;
	}
	
	public OffenseTotalStats getOffense()
	{
		return offense;
	}
	public void setOffense(OffenseTotalStats offense)
	{
		this.offense = offense;
	}
	public DefenseTotalStats getDefense()
	{
		return defense;
	}
	public void setDefense(DefenseTotalStats defense)
	{
		this.defense = defense;
	}
	
	
}
