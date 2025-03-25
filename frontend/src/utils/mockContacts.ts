import { HarryPotter } from "./harrypotterimg";
import { Contact } from "@/model/Contact";

export const mockContacts: Contact[] = [
  {
    id: "HarryPotterContactId",
    name: "Harry Potter",
    phone: "123-456-7890",
    email: "fake@gmail.com",
    notes:
      "Harry is a nice guy. I met him when I was running cross country in 9th grade.",
    image: HarryPotter,
    timeline: [
      "Bday Celebration",
      "HS Graduation",
      "Band Concert",
      "Went to Park",
    ],
    category: ["business"]
  },
  {
    id: "HermioneGrangerContactId",
    name: "Hermione Granger",
    phone: "987-654-3210",
    email: "hermione@mail.com",
    notes: "Brilliant mind, loves books.",
    timeline: ["Study Group", "Graduation Ceremony", "Book Club"],
    category: ["school"]
  },
];
