package edu.byu.pnt.model;

public record Timeline(String id, String ownerID, Event[] events) { };
