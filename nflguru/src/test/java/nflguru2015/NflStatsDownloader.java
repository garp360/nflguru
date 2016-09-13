package nflguru2015;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.junit.Test;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hb.guru.DefenseTotalStats;
import com.hb.guru.OffenseTotalStats;
import com.hb.guru.StatFieldIndex;
import com.hb.guru.TeamStats;

public class NflStatsDownloader
{
	private static final int SEASON_YEAR = 2015;
	private String URL_PARSE_MARKER_EARLY = "<!-- 77 Sortable Column Table 720px START -->";
	private String URL_PARSE_MARKER_LATE = "<!-- End Data Table, if table is not null -->";
	private SimpleDateFormat sdf = new SimpleDateFormat("EEEE,MMMM dd,yyyy,h:mm a z");
	
	@Test
	public void download() {
		Map<String, Map<String, TeamStats>> statsMap = new LinkedHashMap<String, Map<String,TeamStats>>();
		Map<String, OffenseTotalStats> oStatsMap = getOffenseStatistics();
		Map<String, DefenseTotalStats> dStatsMap = getDefenseStatistics();
		Map<String,TeamStats> teamStats = new LinkedHashMap<String, TeamStats>();
		
		List<String> teamNames = new ArrayList<String>();
		teamNames.addAll(oStatsMap.keySet());
		Collections.sort(teamNames);
		
		for (String teamName : teamNames)
		{
			teamStats.put(teamName, new TeamStats(oStatsMap.get(teamName), dStatsMap.get(teamName)));
		}
		statsMap.put("S:2016:W:" + getCurrentWeek() + "", teamStats);
		GsonBuilder builder = new GsonBuilder();
		Gson gson = builder.create();
		
		String json = gson.toJson(statsMap);
		System.out.println(json);
	}
	
	private Map<String, OffenseTotalStats> getOffenseStatistics()
	{
		Map<String, OffenseTotalStats> statsMap = new HashMap<String, OffenseTotalStats>();
		
		try
		{
			URL url = new URL("http://www.nfl.com/stats/categorystats?tabSeq=2&statisticCategory=TOTAL_YARDS&conference=ALL&role=TM&season=" + SEASON_YEAR + "&seasonType=REG");
			
			BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));

			StringBuilder sb = new StringBuilder();
			String inputLine;
			
			while ((inputLine = in.readLine()) != null)
			{
				sb.append(inputLine);
			}
			
			String text = sb.toString();
			
			text = StringUtils.deleteWhitespace(text.split(URL_PARSE_MARKER_EARLY)[1].split(URL_PARSE_MARKER_LATE)[0]);
			text = text.substring(text.indexOf("<td>"));
			text = StringUtils.remove(text, "<trclass=\"even\">");
			text = StringUtils.remove(text, "<trclass=\"odd\">");
			text = StringUtils.remove(text, "</tbody></table>");
			String[] rows = text.split("</tr>");
			
			
			for (String row : rows)
			{
				String teamName = "";
				String[] columns = row.split("</td>");
				int columnNumber = 0;
				OffenseTotalStats stats = new OffenseTotalStats();
				for (String column : columns)
				{
					StatFieldIndex statFieldIndex = StatFieldIndex.findByColumnIndex(columnNumber);
					if(statFieldIndex != null) {
						String value = column.substring(column.indexOf(">") + 1).trim();
						if(statFieldIndex == StatFieldIndex.teamName) {
							value = column.split("team=")[1].split("\"")[0];
							teamName = StringUtils.remove(value, ",");
						}
						
						value = StringUtils.remove(value, ",");
						stats.saveValue(statFieldIndex, value);
					}
					columnNumber += 1;
				}
				statsMap.put(teamName, stats);
			}
		}
		catch (MalformedURLException e)
		{
			e.printStackTrace();
		}
		catch (IOException e)
		{
			e.printStackTrace();
		}
		
		return statsMap;
	}

	private Map<String, DefenseTotalStats> getDefenseStatistics()
	{
		Map<String, DefenseTotalStats> statsMap = new HashMap<String, DefenseTotalStats>();
		try
		{
			URL url = new URL("http://www.nfl.com/stats/categorystats?archive=true&conference=null&role=OPP&offensiveStatisticCategory=null&defensiveStatisticCategory=TOTAL_YARDS&season=" + SEASON_YEAR + "&seasonType=REG&tabSeq=2&qualified=false&Submit=Go");
			BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));

			StringBuilder sb = new StringBuilder();
			String inputLine;
			
			while ((inputLine = in.readLine()) != null)
			{
				sb.append(inputLine);
			}
			
			String text = sb.toString();
			
			
			text = StringUtils.deleteWhitespace(text.split(URL_PARSE_MARKER_EARLY)[1].split(URL_PARSE_MARKER_LATE)[0]);
			text = text.substring(text.indexOf("<td>"));
			text = StringUtils.remove(text, "<trclass=\"even\">");
			text = StringUtils.remove(text, "<trclass=\"odd\">");
			text = StringUtils.remove(text, "</tbody></table>");
			String[] rows = text.split("</tr>");
			
			
			List<DefenseTotalStats> statsList = new ArrayList<DefenseTotalStats>();
			for (String row : rows)
			{
				//System.out.println(row);
				String teamName = "";
				String[] columns = row.split("</td>");
				int columnNumber = 0;
				DefenseTotalStats stats = new DefenseTotalStats();
				for (String column : columns)
				{
					StatFieldIndex statFieldIndex = StatFieldIndex.findByColumnIndex(columnNumber);
					if(statFieldIndex != null) {
						String value = column.substring(column.indexOf(">") + 1).trim();
						if(statFieldIndex == StatFieldIndex.teamName) {
							value = column.split("team=")[1].split("\"")[0];
							teamName = StringUtils.remove(value, ",");
						}
						
						value = StringUtils.remove(value, ",");
						stats.saveValue(statFieldIndex, value);
					}
					columnNumber += 1;
				}
				statsMap.put(teamName, stats);
			}

		}
		catch (MalformedURLException e)
		{
			e.printStackTrace();
		}
		catch (IOException e)
		{
			e.printStackTrace();
		}
		return statsMap;

	}
	
	private int getCurrentWeek()
	{
		Calendar start = Calendar.getInstance();
		start.clear();
		start.set(Calendar.YEAR, 2016);
		start.set(Calendar.MONTH, Calendar.SEPTEMBER);
		start.set(Calendar.DATE, 11);

		Calendar today = Calendar.getInstance();
		today.setTime(new Date());
		start.set(Calendar.HOUR, 0);
		start.set(Calendar.MINUTE, 0);
		start.set(Calendar.SECOND, 0);
		start.set(Calendar.MILLISECOND, 0);
		
		int diff = today.get(Calendar.DAY_OF_YEAR) - start.get(Calendar.DAY_OF_YEAR);
		int week = (diff / 7) + 1; 
		System.out.println(sdf.format(today.getTime()) + " Week = [" + week + "]");
		return week;
	}
	
	

}

