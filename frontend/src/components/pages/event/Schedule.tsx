import { getMockTimeline } from "@/utils/mockTimelineEvents";
import Timeline from "@/components/timeline/timeline";

const Schedule = () => {
  const timelineEvents = getMockTimeline();

  return (
    <div className="m-12 p-6 shadow-lg rounded-lg bg-white">
      <div className="max-w-xs">
        <h1 className="text-3xl font-bold mb-4">Your Timeline</h1>
      </div>
      <div className="mt-4">
        <Timeline timelineEvents={timelineEvents} />
      </div>
    </div>
  );
};

export default Schedule;
