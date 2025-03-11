import { TimelineEvent } from "@/utils/mockTimelineEvents";
import TimelineItem from "@/components/timeline/timelineItem";

interface TimelineProps {
  timelineEvents: TimelineEvent[];
}

export default function Timeline(props: TimelineProps) {
  return (
    <ul className="list-disc">
      {props.timelineEvents.map((timelineEvent, index) => (
        <TimelineItem key={index} timelineEvent={timelineEvent}></TimelineItem>
      ))}
    </ul>
  );
}
