package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.provider.AuthtokenDAO;
import edu.byu.pnt.model.Authtoken;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class MongoAuthtokenDAO extends MongoDAO implements AuthtokenDAO {

    MongoAuthtokenDAO(MongoDatabase database) {
        super(database);
    }

    private final String collectionName = "authtokens";

    @Override
    public Authtoken getAuthtokenByUserID(String userID) throws DataAccessException {
        try {
            MongoCollection<Document> collection = this.getCollection(collectionName);
            List<Authtoken> authtokens = new ArrayList<>();

            // Find all documents matching the userID
            for (Document doc : collection.find(Filters.eq("userID", userID))) {
                String token = doc.getString("token");
                authtokens.add(new Authtoken(token, userID));
            }

            // Multiple tokens found
            if (authtokens.size() > 1) {
                System.err.println("Found multiple authtokens for user with id: " + userID);
            }

            return authtokens.getFirst();
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    @Override
    public Authtoken getAuthtokenByToken(String token) throws DataAccessException {
        try {
            MongoCollection<Document> collection = this.getCollection(collectionName);
            List<Authtoken> authtokens = new ArrayList<>();

            // Find all documents matching the token
            for (Document doc : collection.find(Filters.eq("token", token))) {
                String userID = doc.getString("userID");
                authtokens.add(new Authtoken(token, userID));

                // Multiple tokens found
                if (authtokens.size() > 1) {
                    System.err.println("Found duplicate authtoken connected to user with id: " + userID);
                }
            }

            return authtokens.getFirst();
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    public void addAuthtoken(Authtoken authtoken) throws DataAccessException {
        try {
            MongoCollection<Document> collection = this.getCollection(collectionName);

            // Prepare the document to be inserted
            Document document = new Document("token", authtoken.token())
                    .append("userID", authtoken.userID());

            // Insert the document into the collection
            collection.insertOne(document);
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    @Override
    public void deleteAuthtoken(Authtoken authtoken) throws DataAccessException {
        try {
            MongoCollection<Document> collection = this.getCollection(collectionName);

            // Delete the document matching the contactID and categoryID
            collection.deleteOne(Filters.and(
                    Filters.eq("token", authtoken.token()),
                    Filters.eq("userID", authtoken.userID())
            ));
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }
}
