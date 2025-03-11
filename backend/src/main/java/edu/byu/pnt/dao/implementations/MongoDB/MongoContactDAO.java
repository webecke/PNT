package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.provider.ContactDAO;
import edu.byu.pnt.model.ContactFragment;
import org.bson.Document;

public class MongoContactDAO extends MongoDAO implements ContactDAO {

    MongoContactDAO(MongoDatabase database) {
        super(database);
    }

    @Override
    public ContactFragment getContactFragment(String id) throws DataAccessException {
        try {
            // Access the 'events' collection in the database
            MongoCollection<Document> collection = this.database.getCollection("contacts");

            // Create a query filter to search for the event by its _id field
            Document query = new Document("_id", id);

            // Execute the query to find the event
            FindIterable<Document> eventResult = collection.find(query);
            Document result = eventResult.first();  // Assuming _id is unique

            if (result != null) {
                // Extract fields from the result
                String firstName = result.getString("firstName");
                String lastName = result.getString("lastName");
                String email = result.getString("email");
                String phone = result.getString("phone");
                String note = result.getString("note");

                return new ContactFragment(id, firstName, lastName, email, phone, note);
            } else {
                throw new DataAccessException("ContactFragment not found in database.");
            }
        } catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }

    @Override
    public void addContactFragment(ContactFragment contactFragment) throws DataAccessException {
        try {
            // Access the collection in the database
            MongoCollection<Document> collection = this.database.getCollection("contacts");

            // Create a new document
            Document newContact = new Document("_id", contactFragment.getID())
                    .append("firstName", contactFragment.getFirstName())
                    .append("lastName", contactFragment.getLastName())
                    .append("email", contactFragment.getEmail())
                    .append("phone", contactFragment.getPhone())
                    .append("note", contactFragment.getNote());

            // Insert the new document into the collection
            collection.insertOne(newContact);
        }
        catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
        System.out.println("Contact added with id: " + contactFragment.getID() +
                "("+ contactFragment.getFirstName() + " " + contactFragment.getLastName() + ")");
    }

    @Override
    public void deleteContactFragment(String id) throws DataAccessException {
        this.deleteDocument("contacts", id);
    }

    @Override
    public void updateContactFragment(String id, String firstName, String lastName, String email, String phone, String note) throws DataAccessException {
        try {
            // Access the collection in the database
            MongoCollection<Document> collection = this.database.getCollection("contacts");

            // Create the query
            Document updateFields = new Document();
            updateFields.append("firstName", firstName);
            updateFields.append("lastName", lastName);
            updateFields.append("email", email);
            updateFields.append("phone", phone);
            updateFields.append("note", note);

            // Apply the update
            collection.updateOne(Filters.eq("_id", id), Updates.combine(
                    Updates.set("firstName", firstName),
                    Updates.set("lastName", lastName),
                    Updates.set("email", email),
                    Updates.set("phone", phone),
                    Updates.set("note", note)
            ));

            System.out.println("Contact updated with id: " + id + " (" + firstName + " " + lastName + ").");
        } catch (Exception e) {
            throw new DataAccessException(e.getMessage());
        }
    }
}
