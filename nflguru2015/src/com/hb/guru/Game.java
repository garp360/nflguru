package com.hb.guru;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;

public class Game 
{
	private final String home;
	private final String visitor;
	private int week;
	private Date gametime;
	private long longdate;
	private String favorite;
	private BigDecimal spread = new BigDecimal(999).setScale(1, RoundingMode.HALF_UP);
	private String predictedfavorite;
	private BigDecimal predictedspread = new BigDecimal(999).setScale(1, RoundingMode.HALF_UP);
	private GameScore actualscore = new GameScore();
	private GameScore predictedscore = new GameScore();
	
	public Game(String home, String visitor, int week, Date gametime)
	{
		super();
		this.home = home;
		this.visitor = visitor;
		this.week = week;
		this.gametime = gametime;
		this.longdate = gametime.getTime();
	}

	public int getWeek()
	{
		return week;
	}

	public void setWeek(int week)
	{
		this.week = week;
	}

	public Date getGametime()
	{
		return gametime;
	}

	public void setGametime(Date gametime)
	{
		this.gametime = gametime;
	}

	public String getHome()
	{
		return home;
	}

	public String getVisitor()
	{
		return visitor;
	}

	public long getLongdate()
	{
		return longdate;
	}

	public void setLongdate(long longdate)
	{
		this.longdate = longdate;
	}

	public BigDecimal getSpread()
	{
		return spread;
	}

	public void setSpread(BigDecimal spread)
	{
		this.spread = spread;
	}

	public GameScore getActualscore()
	{
		return actualscore;
	}

	public void setActualscore(GameScore actualscore)
	{
		this.actualscore = actualscore;
	}

	public GameScore getPredictedscore()
	{
		return predictedscore;
	}

	public void setPredictedscore(GameScore predictedscore)
	{
		this.predictedscore = predictedscore;
	}

	public String getFavorite()
	{
		return favorite;
	}

	public void setFavorite(String favorite)
	{
		this.favorite = favorite;
	}

	public String getPredictedfavorite()
	{
		return predictedfavorite;
	}

	public void setPredictedfavorite(String predictedfavorite)
	{
		this.predictedfavorite = predictedfavorite;
	}

	public BigDecimal getPredictedspread()
	{
		return predictedspread;
	}

	public void setPredictedspread(BigDecimal predictedspread)
	{
		this.predictedspread = predictedspread;
	}
	
	
}
