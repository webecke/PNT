import { HarryPotter } from "./harrypotterimg";
import { Contact } from "@/model/Contact";

// MANUALLY POPULATE THIS for your database
export const hardcodedContactIds: string[] = [
  "c6579cda-c4cb-49a4-bf03-ff3f03d9ce40",
  "d4e3502d-2616-4a4d-b105-72da5dce160a",
  "738474ba-038a-4ee4-8db4-9389879122ab",
  "f31f27f4-18bb-4c2f-b0ac-bfd1ec025626",
];

// MANUALLY POPULATE THIS for your database
export const hardcodedEventIds: string[] = [
  "251dc5c1-c2ce-4453-88f3-66c81076a009",
  "f326b1a0-bad8-4fcb-9593-bce7845d51b0",
];

// MANUALLY POPULATE THIS for your database
export const hardcodedCategoryIds: string[] = [
  "evens-category-id",
  "odds-category-id",
  "vowels-category-id",
];

export const mockContacts: Contact[] = [
  {
    id: "HarryPotterContactId",
    firstName: "Harry",
    lastName: "Potter",
    phone: "123-456-7890",
    email: "fake@gmail.com",
    note:
      "Harry is a nice guy. I met him when I was running cross country in 9th grade.",
    image: HarryPotter,
    timeline: [
      "Bday Celebration",
      "HS Graduation",
      "Band Concert",
      "Went to Park",
    ],
    categories: ["business"]
  },
  {
    id: "HermioneGrangerContactId",
    firstName: "Hermione",
    lastName: "Granger",
    phone: "987-654-3210",
    email: "hermione@mail.com",
    note: "Brilliant mind, loves books.",
    timeline: ["Study Group", "Graduation Ceremony", "Book Club"],
    categories: ["school"]
  },
];
