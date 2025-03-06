package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;

import com.mongodb.client.model.Filters;
import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.provider.ContactCategoryDAO;
import edu.byu.pnt.model.ContactCategory;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;


public class MongoContactCategoryDAO extends MongoDAO implements ContactCategoryDAO {

    private final String collectionName = "contact-category";

    MongoContactCategoryDAO(MongoDatabase database) {
        super(database);
    }

    // Fetch all contact categories associated with a given contactID
    @Override
    public List<ContactCategory> getContactCategoriesByContact(String contactID) throws DataAccessException {
        try {
            MongoCollection<Document> collection = database.getCollection(collectionName);
            List<ContactCategory> contactCategories = new ArrayList<>();

            // Find all documents matching the contactID
            for (Document doc : collection.find(Filters.eq("contactID", contactID))) {
                String categoryID = doc.getString("categoryID");
                contactCategories.add(new ContactCategory(contactID, categoryID));
            }

            return contactCategories;
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    @Override
    public List<ContactCategory> getContactCategoriesByCategory(String categoryID) throws DataAccessException {
        try {
            MongoCollection<Document> collection = database.getCollection(collectionName);
            List<ContactCategory> contactCategories = new ArrayList<>();

            // Find all documents matching the categoryID
            for (Document doc : collection.find(Filters.eq("categoryID", categoryID))) {
                String contactID = doc.getString("contactID");
                contactCategories.add(new ContactCategory(contactID, categoryID));
            }

            return contactCategories;
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    @Override
    public void addContactCategory(ContactCategory contactCategory) throws DataAccessException {
        try {
            MongoCollection<Document> collection = database.getCollection(collectionName);

            // Prepare the document to be inserted
            Document document = new Document("contactID", contactCategory.contactID())
                    .append("categoryID", contactCategory.categoryID());

            // Insert the document into the collection
            collection.insertOne(document);
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    @Override
    public void deleteContactCategory(ContactCategory contactCategory) throws DataAccessException {
        try {
            MongoCollection<Document> collection = database.getCollection(collectionName);

            // Delete the document matching the contactID and categoryID
            collection.deleteOne(Filters.and(
                    Filters.eq("contactID", contactCategory.contactID()),
                    Filters.eq("categoryID", contactCategory.categoryID())
            ));
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }
}
