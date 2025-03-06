package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import edu.byu.pnt.dao.DataAccessException;
import org.bson.Document;

public abstract class MongoDAO {
    protected MongoDatabase database;

    protected MongoDAO(MongoDatabase database) {
        this.database = database;
    }

    protected void deleteDocument(String collection, String id) throws DataAccessException {
        try {
            // Access the collection in the database
            MongoCollection<Document> usersCollection = this.database.getCollection(collection);

            // Delete the document with the given id
            usersCollection.deleteOne(Filters.eq("_id", id));

            System.out.println("Document with id: " + id + " deleted from collection: " + collection);
        } catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    protected MongoCollection<Document> getCollection(String collection) {
        return database.getCollection(collection);
    }

}
