package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.MongoDatabase;

public abstract class MongoDAO {
    protected MongoDatabase database;

    protected MongoDAO(MongoDatabase database) {
        this.database = database;
    }

}
