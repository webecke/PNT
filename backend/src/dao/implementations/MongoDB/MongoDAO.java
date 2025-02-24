package implementations.MongoDB;

import com.mongodb.client.MongoDatabase;

public class MongoDAO {
    protected MongoDatabase database;

    protected MongoDAO(MongoDatabase database) {
        this.database = database;
    }
}
