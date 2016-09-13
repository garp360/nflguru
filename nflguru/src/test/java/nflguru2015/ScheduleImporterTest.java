package nflguru2015;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.SimpleTimeZone;

import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.junit.Test;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hb.guru.Game;
import com.hb.guru.TeamStats;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class ScheduleImporterTest
{
	SimpleDateFormat sdf = new SimpleDateFormat("MMMM/d/yyyy h:mm a");

	@Test
	public void newScheduleLoader()
	{
		Map<String, Game> games = gameLoader();
		GsonBuilder builder = new GsonBuilder();
		Gson gson = builder.create();

		String json = gson.toJson(games);
		System.out.println(json);
	}

	private Map<String, Game> gameLoader()
	{
		String filepath = "NFL2016Sched.txt";
		Map<String, Game> games = new LinkedHashMap<String, Game>();

		BufferedReader reader = null;
		try
		{
			sdf.setTimeZone(new SimpleTimeZone(SimpleTimeZone.UTC_TIME, "UTC"));
			InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream(filepath);
			reader = new BufferedReader(new InputStreamReader(inputStream));
			String sCurrentLine;

			while ((sCurrentLine = reader.readLine()) != null)
			{
				try
				{
					String[] params = StringUtils.split(sCurrentLine, ",");

					// VISITOR,HOME,SEASON,WEEK,DAY,MON,DATE,YEAR,HOUR,MIN,TV
					String sDate = params[5] + "/" + params[6] + "/" + params[7] + " " + params[8] + ":" + params[9] + " PM";
					Date gametime = sdf.parse(sDate.trim());

					Integer week = Integer.parseInt(params[3]);

					String id = "S:" + params[2] + ":W:" + params[3] + ":D:" + params[4] + ":H:" + params[1] + ":V:" + params[0];

					Integer season = Integer.parseInt(params[2]);
					Game game = new Game(id, params[1], params[0], week, gametime, season, params[4]);

					games.put(id, game);
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
		return games;
	}

	@Test
	public void testDateFormat()
	{
		String sDate = "JAN/1/2017 4:25 PM";

		SimpleDateFormat sdf = new SimpleDateFormat("MMMM/d/yyyy h:mm a");

		try
		{
			Date gametime = sdf.parse(sDate);
			System.out.println(gametime);
		}
		catch (ParseException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Test
	public void testFirebase() throws Exception
	{
		InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream("hb-nfl-guru-858732361132.json");
		FirebaseOptions options = new FirebaseOptions.Builder().setServiceAccount(inputStream).setDatabaseUrl("https://hb-nfl-guru.firebaseio.com/").build();
		FirebaseApp.initializeApp(options);

		final FirebaseDatabase database = FirebaseDatabase.getInstance();
		DatabaseReference ref = database.getReference("statistics/S:2016:W:0/JAX");
		DatabaseReference child = ref.child("statistics/S:2016:W:0/JAX");

		ref.addValueEventListener(new ValueEventListener() {

			
		    public void onDataChange(DataSnapshot dataSnapshot) {
		    	
		        TeamStats stats = dataSnapshot.getValue(TeamStats.class);
		        System.out.println(stats);
		    }

		    public void onCancelled(DatabaseError databaseError) {
		        System.out.println("The read failed: " + databaseError.getCode());
		    }
		    
		});
	}
	
	@Test
	public void testMongo() throws Exception {
		MongoClient mongoClient = new MongoClient();
		MongoDatabase database = mongoClient.getDatabase("Examples");
		MongoCollection<Document> collection = database.getCollection("people");
	    
		List<Integer> books = Arrays.asList(27464, 747854);
		
		Document person = new Document("_id", "jo")
		                            .append("name", "Jo Bloggs")
		                            .append("address", new BasicDBObject("street", "123 Fake St")
		                                                         .append("city", "Faketon")
		                                                         .append("state", "MA")
		                                                         .append("zip", 12345))
		                            .append("books", books);
		collection.insertOne(person);
		mongoClient.close();
	}

}
