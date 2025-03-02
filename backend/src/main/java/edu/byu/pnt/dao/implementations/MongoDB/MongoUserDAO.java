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

    MongoUserDAO(MongoDatabase database) {
        super(database);
    }

    public User getUser(String id) throws DataAccessException{
        try {
            // Access the 'users' collection in the database
            MongoCollection<Document> usersCollection = this.database.getCollection("users");

            // Create a query filter to search for the user by their _id field
            Document query = new Document("_id", id);

            // Execute the query to find the user
            FindIterable<Document> result = usersCollection.find(query);

            // If a matching user is found, convert the Document to a User object
            Document userDocument = result.first();  // Assuming _id is unique

            if (userDocument != null) {
                // Extract fields from the document and create a User object
                String name = userDocument.getString("name");
                String username = userDocument.getString("username");
                String password = userDocument.getString("password");

                // Create and return the User object
                return new User(id, name, username, password);
            } else {
                throw new DataAccessException("User not found in database.");
            }
        } catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    public void addUser(String id, String name, String username, String password) throws DataAccessException {
        try {
            // Access the 'users' collection in the database
            MongoCollection<Document> usersCollection = this.database.getCollection("users");

            // Create a new user document
            Document newUser = new Document("_id", id)
                    .append("name", name)
                    .append("username", username)
                    .append("password", password);

            // Insert the new user document into the 'users' collection
            usersCollection.insertOne(newUser);
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
        System.out.println("User added: " + username);
    }

    public void deleteUser(String id) throws DataAccessException {
        try {
            // Access the 'users' collection in the database
            MongoCollection<Document> usersCollection = this.database.getCollection("users");

            // Delete the user with the given _id
            usersCollection.deleteOne(Filters.eq("_id", id));

            System.out.println("User deleted: " + id);
        } catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    public void updateUser(String id, String name, String username, String password) throws DataAccessException {
        try {
            // Access the 'users' collection in the database
            MongoCollection<Document> usersCollection = this.database.getCollection("users");

            // Create the update query for the user
            Document updateFields = new Document();
            if (name != null) updateFields.append("name", name);
            if (username != null) updateFields.append("username", username);
            if (password != null) updateFields.append("password", password);

            // Apply the update to the user
            usersCollection.updateOne(Filters.eq("_id", id), Updates.combine(
                    Updates.set("name", name),
                    Updates.set("username", username),
                    Updates.set("password", password)
            ));

            System.out.println("User updated: " + id);
        } catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    public void login() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'login'");
    }

    public void logout() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'logout'");
    }
    
}
