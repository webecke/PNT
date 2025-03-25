package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.provider.EventCategoryDAO;
import edu.byu.pnt.model.EventCategory;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class MongoEventCategory extends MongoDAO implements EventCategoryDAO {

    private final String collectionName = "event-category";  // Name of the collection

    protected MongoEventCategory(MongoDatabase database) {
        super(database);
    }

    @Override
    public List<EventCategory> getEventCategoriesByCategory(String categoryID) throws DataAccessException {
        try {
            MongoCollection<Document> collection = this.getCollection(collectionName);
            List<EventCategory> eventCategories = new ArrayList<>();

            // Find all documents matching the categoryID
            for (Document doc : collection.find(Filters.eq("categoryID", categoryID))) {
                String eventID = doc.getString("eventID");
                eventCategories.add(new EventCategory(eventID, categoryID));
            }

            return eventCategories;
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }
    @Override
    public List<EventCategory> getEventCategoriesByEvent(String eventID) throws DataAccessException {
        try {
            MongoCollection<Document> collection = this.getCollection(collectionName);
            List<EventCategory> eventCategories = new ArrayList<>();

            // Find all documents matching the categoryID
            for (Document doc : collection.find(Filters.eq("eventID", eventID))) {
                String categoryID = doc.getString("categoryID");
                eventCategories.add(new EventCategory(eventID, categoryID));
            }

            return eventCategories;
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    @Override
    public void addEventCategory(EventCategory eventCategory) throws DataAccessException {
        try {
            MongoCollection<Document> collection = this.getCollection(collectionName);

            // Prepare the document to insert
            Document document = new Document("eventID", eventCategory.eventID())
                    .append("categoryID", eventCategory.categoryID());

            // Insert the document into the collection
            collection.insertOne(document);
        } catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    @Override
    public void deleteEventCategory(EventCategory eventCategory) throws DataAccessException {
        try {
            MongoCollection<Document> collection = this.getCollection(collectionName);

            // Delete the document matching the contactID and categoryID
            collection.deleteOne(Filters.and(
                    Filters.eq("eventID", eventCategory.eventID()),
                    Filters.eq("categoryID", eventCategory.categoryID())
            ));
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }
}
