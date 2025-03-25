export interface TimelineEvent extends NewEventData {
  id: string;
}

export interface NewEventData {
  name: string;
  date: Date;
  desc: string;
  contacts: string[];
  categories: string[];
}
