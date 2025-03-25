import { Contact } from "@/model/Contact";
import { TimelineEvent } from "@/model/TimelineEvent";

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 1,
    name: "B-day Celebration",
    date: new Date('2024-03-23'),
    desc: "Harry's bday. It was mildly explosive.",
    contacts: ["Harry Potter"],
    categories: ["party", "memories"]
  },
  {
    id: 2,
    name: "HS Graduation",
    date: new Date('2024-03-23'),
    desc: "Really long and boring, me and Harry just played cards. Hermione had a blast tho",
    contacts: ["Harry Potter", "Hermione Granger"],
    categories: ["school"]
  },
  {
    id: 3,
    name: "Band Concert",
    date: new Date('2024-03-23'),
    desc: "Harry dragged me along to see the Diagon Digons. Weirdly sketchy; surprising amount of maths.",
    contacts: ["Harry Potter"],
    categories: ["memories"]
  },
  {
    id: 4,
    name: "Went to park",
    date: new Date('2024-03-23'),
    desc: "Pretty chill.",
    contacts: ["Hermione Granger"],
    categories: []
  },
  {
    id: 5,
    name: "Study group",
    date: new Date('2024-03-23'),
    desc: "I swear herbology will be the death of me.",
    contacts: ["Hermione Granger"],
    categories: ["school"]
  },
  {
    id: 6,
    name: "Book club",
    date: new Date('2024-03-23'),
    desc: "Beasts were less fantastic than advertised",
    contacts: ["Hermione Granger"],
    categories: ["school"]
  },
    {
    id: 7,
    name: "Meeting Harry Potter",
    date: new Date('2024-03-23'),
    desc: "Harry is a nice guy. I met him when I was running cross country in 9th grade. He is so cool. I wish I could be just like him. Just a magical experience. This could not have gone any better.",
    contacts: ['Harry Potter'],
    categories: ["person", "school", "running", "buisness"]
  },
  {
    id: 8,
    name: "Meeting Hermione Granger",
    date: new Date('2024-03-23'),
    desc: "Brilliant mind, loves books.",
    contacts: ["Hermione Granger"],
    categories: ["person", "books", "buisness"]
  }
];

export function getMockTimeline(contact?: Contact) {
  if (contact) {
    return mockTimelineEvents.filter((event) => event.contacts.includes(contact.name));
  }
  return mockTimelineEvents;
}
