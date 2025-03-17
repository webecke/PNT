import { mockTimelineEvents } from "@/utils/mockTimelineEvents";

interface Props {
    eventID: number;
}

const EventDetail = ({ eventID }: Props) => {
    const event = mockTimelineEvents.find((event) => event.id === eventID);

    if (!event) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                Event not found
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{event.date.toDateString()}</p>
            <p className="text-gray-700 mb-4">{event.desc}</p>
            <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-800">Contacts</h3>
                <p className="text-gray-600">{event.contacts}</p>
            </div>
            <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
                {event.categories.map((category) => (
                    <p key={category} className="text-gray-600">{category}</p>
                ))}
            </div>
        </div>
    );
};

export default EventDetail;
