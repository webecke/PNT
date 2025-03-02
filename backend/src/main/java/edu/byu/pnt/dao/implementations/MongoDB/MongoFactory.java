package edu.byu.pnt.dao.implementations.MongoDB;

import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.provider.CategoryDAO;
import edu.byu.pnt.dao.provider.ContactCategoryDAO;
import edu.byu.pnt.dao.provider.ContactDAO;
import edu.byu.pnt.dao.provider.EventCategoryDAO;
import edu.byu.pnt.dao.provider.EventContactDAO;
import edu.byu.pnt.dao.provider.EventDAO;
import edu.byu.pnt.dao.provider.UserDAO;

import java.io.IOException;
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

    public MongoFactory() {
        // Initialize MongoDB client & database
        try {
            String connectionString = readConfig("uri");
            String dbName = readConfig("db");
            try {
                mongoClient = MongoClients.create(connectionString);
                database = mongoClient.getDatabase(dbName);
                System.out.println("Connected to MongoDB successfully!");

                // Close connection when class scope ends
                Runtime.getRuntime().addShutdownHook(new Thread(MongoFactory::closeConnection));
            } catch (Exception e) {
                System.err.println("Error connecting to MongoDB: " + e.getMessage());
            }
        } catch (IOException e) {
            System.err.println("Error: Failed to read Mongo connection info from config file.");
            e.printStackTrace();
        }
        
    }

    public static void closeConnection() {
        if (mongoClient != null) {
            mongoClient.close();
            mongoClient = null;
            System.out.print("Database connection successfully closed.");
        }
    }

    public static String readConfig(String key) throws IOException {
        String filePath = "config.json";

        // Create a JsonParser instance
        JsonParser jsonParser = JsonParserFactory.getJsonParser();

        // Read the JSON file content into a String
        String jsonContent = new String(Files.readAllBytes(Paths.get(filePath)));

        // Read and parse the JSON file content into a Map
        Map<String, Object> jsonMap = jsonParser.parseMap(jsonContent);

        // Extract the Mongo URI from the parsed map
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
    
}
