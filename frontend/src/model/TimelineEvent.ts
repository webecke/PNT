export interface TimelineEvent {
  id: number;
  name: string;
  date: Date;
  desc: string | null;
  contacts: string[];
  categories: string[];
}
