package nflguru2015;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.SimpleTimeZone;

import org.apache.commons.lang.StringUtils;
import org.junit.Test;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hb.guru.Game;

public class ScheduleImporterTest
{
	SimpleDateFormat sdf = new SimpleDateFormat("EEEE,MMMM dd,yyyy,h:mm a z");
	
	@Test
	public void testDownload()
	{
		Map<Integer, List<Game>> games = load();
		GsonBuilder builder = new GsonBuilder();
		Gson gson = builder.create();
		
		String json = gson.toJson(games);
		System.out.println(json);
	}
	
	private Map<Integer, List<Game>> load() {
		String filepath = "config/NFL2015Sched.txt";
		Map<Integer, List<Game>> map = new HashMap<Integer,List<Game>>();
		
		BufferedReader reader = null;
		try 
		{
			sdf.setTimeZone(new SimpleTimeZone(SimpleTimeZone.UTC_TIME, "UTC"));
			InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream(filepath);
			reader = new BufferedReader(new InputStreamReader(inputStream));
			String sCurrentLine;
			
			int start = 1;
			List<Game> games = new ArrayList<Game>();
			while ((sCurrentLine = reader.readLine()) != null) 
			{
				try
				{
					String[] params = StringUtils.split(sCurrentLine, ",");
					Date gametime;
					String sDate = params[3] +","+ params[4] +",2015,"+ params[5];
					gametime = sdf.parse(sDate.trim());
					Integer week = Integer.parseInt(params[2]);
					
					if(start != week) {
						map.put(start, games);
						start = week;
						games = new ArrayList<Game>();
					}
					Game game = new Game(params[1], params[0], week, gametime);
					games.add(game);
				}
				catch (ParseException e)
				{
					e.printStackTrace();
				}
			}
		} 
		catch (IOException e) 
		{
			e.printStackTrace();
		} 
		finally 
		{
			try 
			{
				if (reader != null) 
				{
					reader.close();
				}
			} 
			catch (IOException ex) 
			{
				ex.printStackTrace();
			}
		}
		return map;
	}
	
	@Test
	public void testDateFormat() {
		String sDate = "Sunday,December 20,2015,04:05 PM EDT";
		SimpleDateFormat sdf = new SimpleDateFormat("EEEE,MMMMM dd,yyyy,hh:mm aaa zzz");
		
			
		try
		{
			Date gametime = sdf.parse(sDate);
			System.out.println(sDate);
		}
		catch (ParseException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
					
	}

}

