package com.hb.guru;

import java.math.BigDecimal;
import java.util.Date;

public class Game 
{
	private String id;
	private final String home;
	private final String visitor;
	private int week;
	private Date gametime;
	private long longdate;
	private String favorite;
	private BigDecimal spread;// = new BigDecimal(999).setScale(1, RoundingMode.HALF_UP);
	private String predictedfavorite;
	private BigDecimal predictedspread;// = new BigDecimal(999).setScale(1, RoundingMode.HALF_UP);
	private GameScore actualscore;// = new GameScore();
	private GameScore predictedscore;// = new GameScore();
	private String day;
	private int season;
	
	public Game(String id, String home, String visitor, int week, Date gametime, int season, String day)
	{
		super();
		this.id = id;
		this.home = home;
		this.visitor = visitor;
		this.week = week;
		this.gametime = gametime;
		this.longdate = gametime.getTime();
		this.day = day;
		this.season = season;
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

	public String getId()
	{
		return id;
	}

	public void setId(String id)
	{
		this.id = id;
	}

	public String getDay()
	{
		return day;
	}

	public void setDay(String day)
	{
		this.day = day;
	}

	public int getSeason()
	{
		return season;
	}

	public void setSeason(int season)
	{
		this.season = season;
	}
	
	
}
