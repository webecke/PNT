package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.model.User;
import org.bson.Document;
import edu.byu.pnt.dao.provider.UserDAO;

public class MongoUserDAO extends MongoDAO implements UserDAO {

    private final String collectionName = "users";

    MongoUserDAO(MongoDatabase database) {
        super(database);
    }

    public User getUser(String id) throws DataAccessException{
        try {
            // Access the 'users' collection in the database
            MongoCollection<Document> usersCollection = this.getCollection(collectionName);

            // Create a query filter to search for the user by their _id field
            Document query = new Document("_id", id);

            // Execute the query to find the user
            FindIterable<Document> result = usersCollection.find(query);

            // If a matching user is found, convert the Document to a User object
            Document userDocument = result.first();  // Assuming _id is unique

            if (userDocument != null) {
                // Extract fields from the document and create a User object
                String firstName = userDocument.getString("firstName");
                String lastName = userDocument.getString("lastName");
                String username = userDocument.getString("username");
                String password = userDocument.getString("password");

                // Create and return the User object
                return new User(id, firstName, lastName, username, password);
            } else {
                throw new DataAccessException("User not found in database.");
            }
        } catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    public void addUser(User user) throws DataAccessException {
        try {
            // Access the 'users' collection in the database
            MongoCollection<Document> usersCollection = this.getCollection(collectionName);

            // Create a new user document
            Document newUser = new Document("_id", user.getID())
                    .append("firstName", user.getFirstName())
                    .append("lastName", user.getLastName())
                    .append("username", user.getUsername())
                    .append("password", user.getPassword());

            // Insert the new user document into the 'users' collection
            usersCollection.insertOne(newUser);
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
        System.out.println("User added with id: " + user.getID() + "(" + user.getUsername() + ")");
    }

    public void deleteUser(String id) throws DataAccessException {
        this.deleteDocument(collectionName, id);
    }

    public void updateUser(String id, String firstName, String lastName, String username, String password) throws DataAccessException {
        try {
            // Access the 'users' collection in the database
            MongoCollection<Document> usersCollection = this.getCollection(collectionName);

            // Create the update query for the user
            Document updateFields = new Document();
            updateFields.append("firstName", firstName);
            updateFields.append("lastName", lastName);
            updateFields.append("username", username);
            updateFields.append("password", password);

            // Apply the update to the user
            usersCollection.updateOne(Filters.eq("_id", id), Updates.combine(
                    Updates.set("firstName", firstName),
                    Updates.set("lastName", lastName),
                    Updates.set("username", username),
                    Updates.set("password", password)
            ));

            System.out.println("User updated with id: " + id + "(" + username + ")");
        } catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }
    
}
