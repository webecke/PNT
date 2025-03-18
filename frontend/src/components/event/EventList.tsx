import { TimelineEvent } from "@/utils/mockTimelineEvents";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import EventDetail from "./EventDetail";
import { EventListPresenter, EventListView } from "@/presenter/EventListPresenter";
import { QueryState } from "@/utils/QueryState";

interface Props {
  category?: string;
  presenter?: EventListPresenter;
}

const EventList = (props: Props) => {
  // TODO Combine EventList and ContactList
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [selectedEventID, setSelectedEventID] = useState<number | undefined>(undefined);
  const [queryState, setQueryState] = useState<QueryState>(QueryState.IN_PROCESS);

  const listener: EventListView = {};
  const presenter = useRef(props.presenter ?? new EventListPresenter(listener));

  useEffect(() => {
    // See comment from ContactDetail.tsx about async useEffect()
    const asyncFunction = async () => {
      const timeline = await presenter.current.getTimeline();
      setQueryState(timeline ? QueryState.SUCCESS : QueryState.FAILURE);
      setEvents(timeline);
    };
    asyncFunction();
  });

  const filteredEvents = useMemo(() => {
    return props.category
      ? events.filter((event) => event.categories?.includes(props.category!))
      : events;
  }, [events, props.category]);

  switch (queryState) {
    // TODO Move the queryState variable (and logic) into the presenter
    case QueryState.IN_PROCESS:
      return <div>Loading timeline...</div>;
    case QueryState.FAILURE:
      return <div>Looks like you don't have any events yet. Let's add a few!</div>;
  }

  return (
    <>
      {selectedEventID ?
      <div>
        <div onClick={() => setSelectedEventID(undefined)}>
          <IoArrowBackSharp className="text-4xl cursor-pointer"/>
        </div>
        <EventDetail eventID={selectedEventID} />
      </div> :
      <div className="mx-auto">
      <ul className="border rounded-lg p-4 bg-white shadow">
        {filteredEvents.map((event) => (
          <li
            key={event.id}
            className="p-2 border-b hover:bg-gray-100 transition"
          >
            <div onClick={() => setSelectedEventID(event.id)}>
              <div className="cursor-pointer flex gap-6">
                {/* Title: Fixed width so it doesn't expand too much */}
                <span className="font-semibold min-w-[150px] max-w-[200px] truncate">
                  {event.name}
                </span>

                {/* Description: Ensure ellipsis shows */}
                <span className="text-gray-500 flex-1 truncate">
                  {event.desc}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
      }

    </>
  );
};

export default EventList;
