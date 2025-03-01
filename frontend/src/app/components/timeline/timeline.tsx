import { TimelineEvent } from "@/app/utils/mockTimelineEvents";
import TimelineItem from "@/app/components/timeline/timelineItem";

interface TimelineProps {
  timelineEvents: TimelineEvent[];
}

export default function Timeline(props: TimelineProps) {
  return (
    <ul className="list-disc ml-6">
      {props.timelineEvents.map((timelineEvent, index) => (
        <TimelineItem key={index} timelineEvent={timelineEvent}></TimelineItem>
      ))}
    </ul>
  );
}
