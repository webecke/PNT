import { Contact } from "@/model/Contact";
import { TimelineEvent } from "@/model/TimelineEvent";

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "EventIdOne",
    name: "B-day Celebration",
    date: '2024-03-23',
    desc: "Harry's bday. It was mildly explosive.",
    contacts: ["HarryPotterContactId"],
    categories: ["party", "memories"]
  },
  {
    id: "EventIdTwo",
    name: "HS Graduation",
    date: '2024-03-23',
    desc: "Really long and boring, me and Harry just played cards. Hermione had a blast tho",
    contacts: ["HarryPotterContactId", "HermioneGrangerContactId"],
    categories: ["school"]
  },
  {
    id: "EventIdThree",
    name: "Band Concert",
    date: '2024-03-23',
    desc: "Harry dragged me along to see the Diagon Digons. Weirdly sketchy; surprising amount of maths.",
    contacts: ["HarryPotterContactId"],
    categories: ["memories"]
  },
  {
    id: "EventIdFour",
    name: "Went to park",
    date: '2024-03-23',
    desc: "Pretty chill.",
    contacts: ["HermioneGrangerContactId"],
    categories: []
  },
  {
    id: "EventIdFive",
    name: "Study group",
    date: '2024-03-23',
    desc: "I swear herbology will be the death of me.",
    contacts: ["HermioneGrangerContactId"],
    categories: ["school"]
  },
  {
    id: "EventIdSix",
    name: "Book club",
    date: '2024-03-23',
    desc: "Beasts were less fantastic than advertised",
    contacts: ["HermioneGrangerContactId"],
    categories: ["school"]
  },
    {
      id: "EventIdSeven",
    name: "Meeting Harry Potter",
      date: '2024-03-23',
    desc: "Harry is a nice guy. I met him when I was running cross country in 9th grade. He is so cool. I wish I could be just like him. Just a magical experience. This could not have gone any better.",
      contacts: ["HarryPotterContactId"],
      categories: ["person", "school", "running", "business"]
  },
  {
    id: "EventIdEight",
    name: "Meeting Hermione Granger",
    date: '2024-03-23',
    desc: "Brilliant mind, loves books.",
    contacts: ["HermioneGrangerContactId"],
    categories: ["person", "books", "business"]
  }
];

export function getMockTimeline(contact?: Contact) {
  if (contact) {
    return mockTimelineEvents.filter((event) => event.contacts.includes(contact.id));
  }
  return mockTimelineEvents;
}
