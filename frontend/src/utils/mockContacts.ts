import { HarryPotter } from "./harrypotterimg";
import { Contact } from "@/model/Contact";

// MANUALLY POPULATE THIS
export const mockContactIds: string[] = [
  "c6579cda-c4cb-49a4-bf03-ff3f03d9ce40",
  "d4e3502d-2616-4a4d-b105-72da5dce160a",
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
