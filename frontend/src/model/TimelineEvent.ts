export interface TimelineEvent {
  id: string;
  name: string;
  date: Date;
  desc: string | null;
  contacts: string[];
  categories: string[];
}
