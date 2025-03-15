export interface Event {
  id: number;
  userID: number;
  title: string;
  description: string;
  categories: string[];
}

export const mockEvents: Event[] = [
  {
    id: 1,
    userID: 1,
    title: "Meeting Harry Potter",
    description: "Harry is a nice guy. I met him when I was running cross country in 9th grade. He is so cool. I wish I could be just like him. Just a magical experience. This could not have gone any better.",
    categories: ["person", "school", "running"]
  },
  {
    id: 2,
    userID: 1,
    title: "Meeting Hermione Granger",
    description: "Brilliant mind, loves books.",
    categories: ["person", "books"]
  },
];
