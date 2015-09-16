package nflguru2015;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.junit.Test;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hb.guru.Game;

public class WeekSelectorTest
{
	SimpleDateFormat sdf = new SimpleDateFormat("EEEE,MMMM dd,yyyy,h:mm a z");
	
	@Test
	public void testDownload()
	{
		Calendar start = Calendar.getInstance();
		start.clear();
		start.set(Calendar.YEAR, 2015);
		start.set(Calendar.MONTH, Calendar.SEPTEMBER);
		start.set(Calendar.DATE, 9);

		Calendar today = Calendar.getInstance();
		today.setTime(new Date());
		start.set(Calendar.HOUR, 0);
		start.set(Calendar.MINUTE, 0);
		start.set(Calendar.SECOND, 0);
		start.set(Calendar.MILLISECOND, 0);
		
		int diff = today.get(Calendar.DAY_OF_YEAR) - start.get(Calendar.DAY_OF_YEAR);
		//System.out.println("diff = [" + diff + "]");
		int week = (diff / 7) + 1; 
		System.out.println(sdf.format(today.getTime()) + " Week = [" + week + "]");
	}
	
	
	@Test
	public void testDownloadOctober()
	{
		Calendar start = Calendar.getInstance();
		start.clear();
		start.set(Calendar.YEAR, 2015);
		start.set(Calendar.MONTH, Calendar.SEPTEMBER);
		start.set(Calendar.DATE, 9);

		Calendar today = Calendar.getInstance();
		today.clear();
		today.set(Calendar.YEAR, 2015);
		today.set(Calendar.MONTH, Calendar.OCTOBER);
		today.set(Calendar.DATE, 24);
		today.set(Calendar.HOUR, 0);
		today.set(Calendar.MINUTE, 0);
		today.set(Calendar.SECOND, 0);
		today.set(Calendar.MILLISECOND, 0);
		
		int diff = today.get(Calendar.DAY_OF_YEAR) - start.get(Calendar.DAY_OF_YEAR);
		//.out.println("diff = [" + diff + "]");
		int week = (diff / 7) + 1; 
		System.out.println(sdf.format(today.getTime()) + " Week = [" + week + "]");
	}

	@Test
	public void testDownloadDecember()
	{
		Calendar start = Calendar.getInstance();
		start.clear();
		start.set(Calendar.YEAR, 2015);
		start.set(Calendar.MONTH, Calendar.SEPTEMBER);
		start.set(Calendar.DATE, 9);
		
		Calendar today = Calendar.getInstance();
		today.clear();
		today.set(Calendar.YEAR, 2015);
		today.set(Calendar.MONTH, Calendar.DECEMBER);
		today.set(Calendar.DATE, 16);
		today.set(Calendar.HOUR, 0);
		today.set(Calendar.MINUTE, 0);
		today.set(Calendar.SECOND, 0);
		today.set(Calendar.MILLISECOND, 0);
		
		int diff = today.get(Calendar.DAY_OF_YEAR) - start.get(Calendar.DAY_OF_YEAR);
		//.out.println("diff = [" + diff + "]");
		int week = (diff / 7) + 1; 
		System.out.println(sdf.format(today.getTime()) + " Week = [" + week + "]");
	}


}

