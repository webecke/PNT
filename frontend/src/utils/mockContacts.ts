import { HarryPotter } from "./harrypotterimg";
import { Contact } from "@/model/Contact";

// MANUALLY POPULATE THIS for your database
export const hardcodedContactIds: string[] = [
  "efd32194-320f-41d6-855a-4bb46577e29c", // Harry
  "7e450ac6-71f6-40c4-9a55-c4e3224c0766", // Herm
  "02fd5d4b-f918-485a-bf4c-cb8a49607c24", // Bob dole
];

// MANUALLY POPULATE THIS for your database
export const hardcodedEventIds: string[] = [
  "11021ee5-8f32-46e1-8e7a-b325bc34c9ab", // bday
  "f90e19b5-33cd-453c-8fe2-59e6b68efe8d", // grad
  "8c34cb5e-8726-4c1b-b7f8-ea971156c825", // concert
  "823cf6d7-0cc5-4224-9ac6-1a9ca1f741c4", // park
  "1588b807-5263-4910-b353-f50800e619c7", // study
  "f57a3bcb-0f1f-43fe-9d30-a450e349a2e9", // book club
];

// MANUALLY POPULATE THIS for your database
export const hardcodedCategoryIds: string[] = [
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
    categories: ["friends"]
  },
  {
    id: "HermioneGrangerContactId",
    firstName: "Hermione",
    lastName: "Granger",
    phone: "987-654-3210",
    email: "hermione@mail.com",
    note: "Brilliant mind, loves books.",
    timeline: ["Study Group", "Graduation Ceremony", "Book Club"],
    categories: ["friends, school"]
  },
];
