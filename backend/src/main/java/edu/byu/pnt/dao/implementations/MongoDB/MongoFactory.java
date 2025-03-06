package edu.byu.pnt.dao.implementations.MongoDB;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.provider.*;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class MongoFactory implements DAOFactory{

    // private MongoClient mongoClient;
    private static MongoClient mongoClient;
    private static MongoDatabase database;

    public MongoFactory() throws DataAccessException {
        // Initialize MongoDB client & database
        String connectionString;
        String dbName;
        try {
            connectionString = readConfig("uri");
            dbName = readConfig("db");
        } catch (IOException e) {
            throw new DataAccessException("Error: Failed to read Mongo connection info from config file: " + e.getMessage());
        }
        try {
            mongoClient = MongoClients.create(connectionString);
            database = mongoClient.getDatabase(dbName);
            System.out.println("Connected to MongoDB successfully!");

            // Close connection when class scope ends
            Runtime.getRuntime().addShutdownHook(new Thread(MongoFactory::closeConnection));
        } catch (Exception e) {
            throw new DataAccessException("Error connecting to MongoDB: " + e.getMessage());
        }
        
    }

    public static void closeConnection() {
        if (mongoClient != null) {
            mongoClient.close();
            mongoClient = null;
            System.out.println("Database connection successfully closed.");
        }
    }

    public static String readConfig(String key) throws IOException {
        // Get the resource as an InputStream from the classpath
        InputStream inputStream = MongoFactory.class.getClassLoader().getResourceAsStream("config.json");

        if (inputStream == null) {
            throw new IOException("config.json not found in classpath");
        }

        // Read the JSON file content into a String
        String jsonContent = new String(inputStream.readAllBytes());

        // Create a JsonParser instance
        JsonParser jsonParser = JsonParserFactory.getJsonParser();

        // Parse the JSON file content into a Map
        Map<String, Object> jsonMap = jsonParser.parseMap(jsonContent);

        // Extract the Mongo URI and DB Name from the parsed map
        Map<String, Object> mongodb = (Map<String, Object>) jsonMap.get("mongodb");
        return (String) mongodb.get(key);
    }

    @Override
    public UserDAO createUserDAO() {
        return new MongoUserDAO(this.database);
    }

    @Override
    public ContactDAO createContactDAO() {
        return new MongoContactDAO(database);
    }

    @Override
    public EventDAO createEventDAO() {
        return new MongoEventDAO(database);
    }

    @Override
    public CategoryDAO createCategoryDAO() {
        return new MongoCategoryDAO(database);
    }

    @Override
    public EventContactDAO createEventContactDAO() {
        return new MongoEventContact(database);
    }

    @Override
    public EventCategoryDAO createEventCategoryDAO() {
        return new MongoEventCategory(database);
    }

    @Override
    public ContactCategoryDAO createContactCategoryDAO() {
        return new MongoContactCategoryDAO(database);
    }

    public AuthtokenDAO createAuthtokenDAO() { return new MongoAuthtokenDAO(database); }
}
