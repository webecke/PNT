export interface TimelineEvent {
  id: number;
  name: string;
  date: string;
  desc: string | null;
  contacts: string[];
  categories: string[];
}

const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 1,
    name: "B-day Celebration",
    date: "31 July",
    desc: "Harry's bday. It was mildly explosive.",
    contacts: ["Harry Potter"],
    categories: ["party", "memories"]
  },
  {
    id: 2,
    name: "HS Graduation",
    date: "17 August",
    desc: "Really long and boring, me and Harry just played cards. Hermione had a blast tho",
    contacts: ["Harry Potter", "Hermione Granger"],
    categories: ["school"]
  },
  {
    id: 3,
    name: "Band Concert",
    date: "2 September",
    desc: "Harry dragged me along to see the Diagon Digons. Weirdly sketchy; surprising amount of maths.",
    contacts: ["Harry Potter"],
    categories: ["memories"]
  },
  {
    id: 4,
    name: "Went to park",
    date: "12 September",
    desc: "Pretty chill.",
    contacts: ["Hermione Granger"],
    categories: []
  },
  {
    id: 5,
    name: "Study group",
    date: "25 August",
    desc: "I swear herbology will be the death of me.",
    contacts: ["Hermione Granger"],
    categories: ["school"]
  },
  {
    id: 6,
    name: "Book club",
    date: "2 October",
    desc: "Beasts were less fantastic than advertised",
    contacts: ["Hermione Granger"],
    categories: ["school"]
  }
];

export function getMockTimeline(contactId?: number) {
  if (contactId) {
    return mockTimelineEvents.filter((event) => event.contacts.includes(contactId));
  }
  return mockTimelineEvents;
}
