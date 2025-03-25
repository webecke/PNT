export interface TimelineEvent extends NewEventData {
  id: string;
}

export interface NewEventData {
  title: string;
  date: string;
  description: string;
  contacts: string[];
  categories: string[];
}
