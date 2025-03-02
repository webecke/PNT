package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.provider.EventDAO;
import edu.byu.pnt.model.Contact;
import edu.byu.pnt.model.Event;
import edu.byu.pnt.model.User;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class MongoEventDAO extends MongoDAO implements EventDAO{

    MongoEventDAO(MongoDatabase database) {
        super(database);
    }

    public Event getEvent(String id) throws DataAccessException {
        try {
            // Access the 'events' collection in the database
            MongoCollection<Document> usersCollection = this.database.getCollection("events");

            // Create a query filter to search for the event by its _id field
            Document eventQuery = new Document("_id", id);

            // Execute the query to find the event
            FindIterable<Document> eventResult = usersCollection.find(eventQuery);
            Document eventDocument = eventResult.first();  // Assuming _id is unique

            if (eventDocument != null) {
                // Extract fields from the document
                String title = eventDocument.getString("title");
                String date = eventDocument.getString("date");
                String description = eventDocument.getString("description");

                // Fetch all contacts for the event
                MongoCollection<Document> eventContactCollection = this.database.getCollection("event-contact");

                // Create a query
                Document eventContactQuery = new Document("eventID", id);

                // Execute the query
                FindIterable<Document> eventContactResult = eventContactCollection.find(eventContactQuery);

                // Extract the related contact ids
                List<String> contactIDs = new ArrayList<String>();
                for (Document row : eventContactResult) {
                    contactIDs.add(row.getString("contactID"));
                }

                // Fetch all categories for the event
                MongoCollection<Document> eventCategoryCollection = this.database.getCollection("event-category");

                // Create a query
                Document eventCategoryQuery = new Document("eventID", id);

                // Execute the query
                FindIterable<Document> eventCategoryResult = eventCategoryCollection.find(eventCategoryQuery);

                // Extract the related category ids
                List<String> categoryIDs = new ArrayList<String>();
                for (Document row : eventCategoryResult) {
                    categoryIDs.add(row.getString("categoryID"));
                }

                // Create and return the User object
                return new Event(id, title, date, description, contactIDs, categoryIDs);
            } else {
                throw new DataAccessException("Event not found in database.");
            }
        } catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    public void addEvent(Event event) throws DataAccessException {
        try {
            // Access the 'events' collection in the database
            MongoCollection<Document> eventsCollection = this.database.getCollection("events");

            // Create an event document
            Document newEvent = new Document("_id", event.getID())
                    .append("title", event.getTitle())
                    .append("date", event.getDate())
                    .append("description", event.getDescription());

            // Insert the new event document into the 'events' collection
            eventsCollection.insertOne(newEvent);

            // Insert all contacts into event-contacts table
            MongoCollection<Document> eventContactCollection = this.database.getCollection("event-contact");
            for (String contactID : event.getContacts()) {
                eventContactCollection.insertOne(new Document("eventID", event.getID()).append("contactID", contactID));
            }

            // Insert all categories into event-category table
            MongoCollection<Document> eventCategoryCollection = this.database.getCollection("event-category");
            for (String categoryID : event.getCategories()) {
                eventCategoryCollection.insertOne(new Document("eventID", event.getID()).append("categoryID", categoryID));
            }
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
        System.out.println("Event added: " + event.getTitle());
    }

    public void deleteEvent() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteEvent'");
    }

    public void updateEvent() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateEvent'");
    }
    
}
