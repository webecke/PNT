import { Contact } from "@/model/Contact";
import { TimelineEvent } from "@/model/TimelineEvent";

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "EventIdOne",
    title: "B-day Celebration",
    date: '2024-03-23',
    description: "Harry's bday. It was mildly explosive.",
    contacts: ["HarryPotterContactId"],
    categories: ["party", "memories"]
  },
  {
    id: "EventIdTwo",
    title: "HS Graduation",
    date: '2024-03-23',
    description: "Really long and boring, me and Harry just played cards. Hermione had a blast tho",
    contacts: ["HarryPotterContactId", "HermioneGrangerContactId"],
    categories: ["school"]
  },
  {
    id: "EventIdThree",
    title: "Band Concert",
    date: '2024-03-23',
    description: "Harry dragged me along to see the Diagon Digons. Weirdly sketchy; surprising amount of maths.",
    contacts: ["HarryPotterContactId"],
    categories: ["memories"]
  },
  {
    id: "EventIdFour",
    title: "Went to park",
    date: '2024-03-23',
    description: "Pretty chill.",
    contacts: ["HermioneGrangerContactId"],
    categories: []
  },
  {
    id: "EventIdFive",
    title: "Study group",
    date: '2024-03-23',
    description: "I swear herbology will be the death of me.",
    contacts: ["HermioneGrangerContactId"],
    categories: ["school"]
  },
  {
    id: "EventIdSix",
    title: "Book club",
    date: '2024-03-23',
    description: "Beasts were less fantastic than advertised",
    contacts: ["HermioneGrangerContactId"],
    categories: ["school"]
  },
    {
      id: "EventIdSeven",
      title: "Meeting Harry Potter",
      date: '2024-03-23',
      description: "Harry is a nice guy. I met him when I was running cross country in 9th grade. He is so cool. I wish I could be just like him. Just a magical experience. This could not have gone any better.",
      contacts: ["HarryPotterContactId"],
      categories: ["person", "school", "running", "business"]
  },
  {
    id: "EventIdEight",
    title: "Meeting Hermione Granger",
    date: '2024-03-23',
    description: "Brilliant mind, loves books.",
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
