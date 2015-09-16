package nflguru2015;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.junit.Test;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hb.guru.DefenseTotalStats;
import com.hb.guru.StatFieldIndex;

public class NflDownloaderDefenseTest
{

	private static final String NFL_URL = "http://www.nfl.com/stats/categorystats?archive=true&conference=null&role=OPP&offensiveStatisticCategory=null&defensiveStatisticCategory=TOTAL_YARDS&season=2015&seasonType=REG&tabSeq=2&qualified=false&Submit=Go";
	private String URL_PARSE_MARKER_EARLY = "<!-- 77 Sortable Column Table 720px START -->";
	private String URL_PARSE_MARKER_LATE = "<!-- End Data Table, if table is not null -->";
	
	@Test
	public void testDownload()
	{
		try
		{
			URL url = new URL(NFL_URL);
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
			
			Map<String, DefenseTotalStats> statsMap = new HashMap<String, DefenseTotalStats>();
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
////				System.out.println(stats.toString());
				//statsList.add(stats);
				statsMap.put(teamName, stats);
			}
			GsonBuilder builder = new GsonBuilder();
			Gson gson = builder.create();
			
			String json = gson.toJson(statsMap);
			System.out.println(json);
		}
		catch (MalformedURLException e)
		{
			e.printStackTrace();
		}
		catch (IOException e)
		{
			e.printStackTrace();
		}

	}

}

