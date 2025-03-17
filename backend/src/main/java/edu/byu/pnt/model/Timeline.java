package edu.byu.pnt.model;

import java.util.List;

public record Timeline(String ownerID, List<Event> events) { };
