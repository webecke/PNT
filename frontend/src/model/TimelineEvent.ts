export interface TimelineEvent extends NewEventData {
  id: string;
}

export interface NewEventData {
  name: string;
  date: string;
  desc: string;
  contacts: string[];
  categories: string[];
}
