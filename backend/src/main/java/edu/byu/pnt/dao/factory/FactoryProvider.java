package edu.byu.pnt.dao.factory;

import edu.byu.pnt.dao.implementations.MongoDB.MongoFactory;

public class FactoryProvider {

    private DAOFactory factory;

    public DAOFactory getFactory() {
        if (factory == null) {
            factory = new MongoFactory();   // Change this line to switch db implementations
        }
        return factory;
    }
}