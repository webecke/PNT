import { mockEvents } from "@/utils/mockEvents";
import Link from "next/link";

const EventList = () => {
  return (
    <div className="mx-auto">
      <ul className="border rounded-lg p-4 bg-white shadow">
        {mockEvents.map((event) => (
          <li
            key={event.id}
            className="p-2 border-b hover:bg-gray-100 transition"
          >
            <Link href={`/event/${event.id}`}>
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
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
