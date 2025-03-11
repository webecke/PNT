package edu.byu.pnt.model;

import java.util.Date;
import java.util.List;

public record Event(String id, String title, String date, String description, List<String> contacts, List<String> categories) { };
