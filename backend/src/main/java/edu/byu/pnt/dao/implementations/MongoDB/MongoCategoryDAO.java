package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.provider.CategoryDAO;
import edu.byu.pnt.model.Category;
import org.bson.Document;

public class MongoCategoryDAO extends MongoDAO implements CategoryDAO {

    private final String collectionName = "categories";

    MongoCategoryDAO(MongoDatabase database) {
        super(database);
    }

    public Category getCategory(String id)  throws DataAccessException{
        try {
            // Access the 'events' collection in the database
            MongoCollection<Document> collection = this.getCollection(collectionName);

            // Create a query filter to search for the event by its _id field
            Document query = new Document("_id", id);

            // Execute the query to find the event
            FindIterable<Document> eventResult = collection.find(query);
            Document result = eventResult.first();  // Assuming _id is unique

            if (result != null) {
                // Extract fields from the result
                String label = result.getString("label");

                return new Category(id, label);
            } else {
                throw new DataAccessException("Category not found in database.");
            }
        } catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    public void addCategory(Category category) throws DataAccessException {
        try {
            // Access the collection in the database
            MongoCollection<Document> collection = this.getCollection(collectionName);

            // Create a new document
            Document newCategory = new Document("_id", category.id())
                    .append("label", category.label());

            // Insert the new document into the collection
            collection.insertOne(newCategory);

            // Loggin message
            System.out.println("Category added with id: " + category.id() +
                    "("+ category.label() + ")");
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    public void deleteCategory(String id) throws DataAccessException {
        this.deleteDocument(collectionName, id);
    }

    public void updateCategory(String id, String newLabel) throws DataAccessException {
        try {
            // Access the collection in the database
            MongoCollection<Document> collection = this.getCollection(collectionName);

            // Create the update document
            Document updateFields = new Document();
            updateFields.append("label", newLabel);

            // Apply the update to the category with the given id
            collection.updateOne(Filters.eq("_id", id), Updates.set("label", newLabel));

            // Log the update operation
            System.out.println("Category updated with id: " + id + " (New label: " + newLabel + ")");
        } catch (Exception e) {
            throw new DataAccessException("Failed to update category with id: " + id + ". Reason:" + e.getMessage());
        }
    }


}
