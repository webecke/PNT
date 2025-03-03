package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.provider.EventDAO;
import edu.byu.pnt.model.EventFragment;
import org.bson.Document;


public class MongoEventDAO extends MongoDAO implements EventDAO{

    MongoEventDAO(MongoDatabase database) {
        super(database);
    }

    /*
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
    */

    public EventFragment getEventFragment(String id) throws DataAccessException {
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

                return new EventFragment(id, title, date, description);
            } else {
                throw new DataAccessException("Event not found in database.");
            }
        } catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    public void addEventFragment(EventFragment event) throws DataAccessException {
        try {
            // Access the 'events' collection in the database
            MongoCollection<Document> eventsCollection = this.database.getCollection("events");

            // Create an event document
            Document newEvent = new Document("_id", event.id())
                    .append("title", event.title())
                    .append("date", event.date())
                    .append("description", event.description());

            // Insert the new event document into the 'events' collection
            eventsCollection.insertOne(newEvent);

            // TODO delete unnecessary code after discussing with team
            // Insert all contacts into event-contacts table
//            MongoCollection<Document> eventContactCollection = this.database.getCollection("event-contact");
//            for (String contactID : event.getContacts()) {
//                eventContactCollection.insertOne(new Document("eventID", event.getID()).append("contactID", contactID));
//            }
//
//            // Insert all categories into event-category table
//            MongoCollection<Document> eventCategoryCollection = this.database.getCollection("event-category");
//            for (String categoryID : event.getCategories()) {
//                eventCategoryCollection.insertOne(new Document("eventID", event.getID()).append("categoryID", categoryID));
//            }
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
        System.out.println("Event added: " + event.title());
    }

    public void deleteEventFragment(String id) throws DataAccessException {
        this.deleteDocument("events", id);
    }

    public void updateEventFragment(String id, String title, String date, String description) throws DataAccessException {
        try {
            // Access the 'users' collection in the database
            MongoCollection<Document> usersCollection = this.database.getCollection("events");

            // Create the update query for the user
            Document updateFields = new Document();
            if (title != null) updateFields.append("title", title);
            if (date != null) updateFields.append("date", date);
            if (description != null) updateFields.append("description", description);

            // Apply the update to the user
            usersCollection.updateOne(Filters.eq("_id", id), Updates.combine(
                    Updates.set("title", title),
                    Updates.set("date", date),
                    Updates.set("description", description)
            ));

            System.out.println("Event updated with id: " + id + " (" + title + ").");
        } catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }
    
}
