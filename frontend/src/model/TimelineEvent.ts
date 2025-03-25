export interface TimelineEvent {
  id: string;
  name: string;
  date: Date;
  desc: string | null;
  contacts: string[];
  categories: string[];
}

export interface NewEventData {
  name: string;
  date: Date;
  desc: string;
  contacts: string[];
  categories: string[];
}
