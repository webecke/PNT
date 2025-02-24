package implementations.MongoDB;

import factory.DAOFactory;
import provider.CategoryDAO;
import provider.ContactCategoryDAO;
import provider.ContactDAO;
import provider.EventCategoryDAO;
import provider.EventContactDAO;
import provider.EventDAO;
import provider.UserDAO;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class MongoFactory implements DAOFactory{

    // private MongoClient mongoClient;
    private MongoDatabase database;

    public MongoFactory() {
        // Initialize MongoDB client 
        String connectionString = "CONNECTION_STRING_HERE";         // TODO replace
            try (MongoClient mongoClient = MongoClients.create(connectionString)) {
                this.database = mongoClient.getDatabase("DATABASE_NAME_HERE");    // TODO replace
                System.out.println("Connected to MongoDB successfully!");
                // Perform database operations here
            } catch (Exception e) {
                System.err.println("Error connecting to MongoDB: " + e.getMessage());
            }
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
