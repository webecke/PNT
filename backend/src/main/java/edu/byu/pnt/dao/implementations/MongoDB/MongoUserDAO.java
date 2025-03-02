package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import edu.byu.pnt.dao.DataAccessException;
import org.bson.Document;
import edu.byu.pnt.dao.provider.UserDAO;

import java.util.zip.DataFormatException;

public class MongoUserDAO extends MongoDAO implements UserDAO {

    MongoUserDAO(MongoDatabase database) {
        super(database);
    }

    public void getUser(String id) {
        // TODO implement
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

    public void deleteUser() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteUser'");
    }

    public void updateUser() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
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
