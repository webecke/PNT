import { useMemo } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import EventDetail from "./EventDetail";
import { useUserContext } from "@/contexts/user-context";

interface Props {
  category?: string;
}

const EventList = (props: Props) => {
  const { user, events, selectedEventId, setSelectedEventId } = useUserContext();

  const filteredEvents = useMemo(() => {
    return props.category
      ? events.filter((event) => event.categories?.includes(props.category!))
      : events;
  }, [events, props.category]);

  return (
    <>
      {user ? selectedEventId ?
        <div>
          <div onClick={() => setSelectedEventId(undefined)}>
            <IoArrowBackSharp className="text-4xl cursor-pointer" />
          </div>
          <EventDetail eventId={selectedEventId} />
        </div> :
        filteredEvents.length > 0 ?
        <div className="mx-auto">
          <ul className="border rounded-lg p-4 bg-white shadow">
            {filteredEvents.map((event) => (
              <li
                key={event.id}
                className="p-2 border-b hover:bg-gray-100 transition"
              >
                <div onClick={() => setSelectedEventId(event.id)}>
                  <div className="cursor-pointer flex gap-6">
                    {/* Title: Fixed width so it doesn't expand too much */}
                    <span className="font-semibold min-w-[150px] max-w-[200px] truncate">
                  {event.title}
                </span>

                    {/* Description: Ensure ellipsis shows */}
                    <span className="text-gray-500 flex-1 truncate">
                  {event.description}
                </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div> : <div>It looks like there are no events yet. Go ahead and add a few!</div>
       : <div className="text-lg">Please log in</div>}

    </>
  );
};

export default EventList;
