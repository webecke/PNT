package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import com.mongodb.client.model.Filters;
import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.provider.EventContactDAO;
import edu.byu.pnt.model.EventContact;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class MongoEventContact extends MongoDAO implements EventContactDAO {

    private final String collectionName = "event-contact";

    protected MongoEventContact(MongoDatabase database) {
        super(database);
    }

    @Override
    public List<EventContact> getEventContactsByEventID(String eventID) throws DataAccessException {
        try {
            MongoCollection<Document> collection = this.getCollection(collectionName);
            List<EventContact> eventContacts = new ArrayList<>();

            // Find all documents matching the categoryID
            for (Document doc : collection.find(Filters.eq("eventID", eventID))) {
                String contactID = doc.getString("contactID");
                eventContacts.add(new EventContact(eventID, contactID));
            }

            return eventContacts;
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    @Override
    public List<EventContact> getEventContactsByContactID(String contactID) throws DataAccessException {
        try {
            MongoCollection<Document> collection = this.getCollection(collectionName);
            List<EventContact> eventContacts = new ArrayList<>();

            // Find all documents matching the categoryID
            for (Document doc : collection.find(Filters.eq("contactID", contactID))) {
                String eventID = doc.getString("eventID");
                eventContacts.add(new EventContact(eventID, contactID));
            }

            return eventContacts;
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    @Override
    public void addEventContact(EventContact eventContact) throws DataAccessException {
        try {
            MongoCollection<Document> collection = this.getCollection(collectionName);

            // Prepare the document to insert
            Document document = new Document("eventID", eventContact.eventID())
                    .append("contactID", eventContact.contactID());

            // Insert the document into the collection
            collection.insertOne(document);
        } catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    @Override
    public void deleteEventContact(EventContact eventContact) throws DataAccessException {
        try {
            MongoCollection<Document> collection = this.getCollection(collectionName);

            // Delete the document matching the eventID and contactID
            collection.deleteOne(Filters.and(
                    Filters.eq("eventID", eventContact.eventID()),
                    Filters.eq("contactID", eventContact.contactID())
            ));
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }
}
