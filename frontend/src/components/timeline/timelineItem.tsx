import { TimelineEvent } from "@/utils/mockTimelineEvents";
import { formatStringList } from "@/utils/stringUtils";

interface Props {
  timelineEvent: TimelineEvent
}

export default function TimelineItem(props: Props) {

  return (
    <div className="mt-1 p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold">{props.timelineEvent.name}</h2>
      <p className="text-gray-700 mt-2">{props.timelineEvent.desc}</p>
      <p className="text-gray-700 mt-2 italic">{"Attendees: " + formatStringList(props.timelineEvent.contacts)}</p>
      <p className="text-gray-700 mt-2 italic">{"Tags: " + formatStringList(props.timelineEvent.categories)}</p>
      <p className="text-gray-500 mt-2 font-semibold">{`Date: ${props.timelineEvent.date}`}</p>
    </div>
  );
}
