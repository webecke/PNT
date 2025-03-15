
import { mockTimelineEvents } from "@/utils/mockTimelineEvents";
import { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import EventDetail from "./eventDetail";

const EventList = ({ category }: { category?: string}) => {
    const [events] = useState(mockTimelineEvents);
    const [selectedEvent, setSelectedEvent] = useState<number | undefined>(undefined);
    const [filteredEvents, setFilteredEvents] = useState(mockTimelineEvents);

    useEffect(() => {
        if (category) {
          setFilteredEvents(events.filter((event) => event.categories?.includes(category)));
        } else {
          setFilteredEvents(events);
        }
    }, [events, category]);

  return (
    <>
    { selectedEvent ?
      <div>
        <div onClick={() => setSelectedEvent(undefined)}>
          <IoArrowBackSharp className="text-4xl cursor-pointer"/>
        </div>
        <EventDetail eventID={selectedEvent} />
      </div> :
      <div className="mx-auto">
      <ul className="border rounded-lg p-4 bg-white shadow">
        {filteredEvents.map((event) => (
          <li
            key={event.id}
            className="p-2 border-b hover:bg-gray-100 transition"
          >
            <div onClick={() => setSelectedEvent(event.id)}>
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
