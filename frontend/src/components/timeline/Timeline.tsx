import { TimelineEvent } from "@/model/TimelineEvent";
import TimelineItem from "@/components/timeline/TimelineItem";

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
