package edu.byu.pnt.controller.id;

import java.util.UUID;

public class UUIDGenerator implements IDGenerator {

    @Override
    public String generateID() {
        return UUID.randomUUID().toString();
    }
}
