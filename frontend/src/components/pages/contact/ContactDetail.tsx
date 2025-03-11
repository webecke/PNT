import { mockContacts } from "@/utils/mockContacts";
import { getMockTimeline } from "@/utils/mockTimelineEvents";
import ProfileIcon from "@/components/profileIcon";
import Timeline from "@/components/timeline/timeline";

interface Props {
  userId: string | string[] | undefined;
}

const ContactDetail = ({ userId }: Props) => {
  const contact = mockContacts.find((c) => c.id.toString() === userId);

  if (!contact) return <div>Contact not found.</div>;

  const timelineEvents = getMockTimeline(contact);

  return (
    <div className="m-12 p-6 shadow-lg rounded-lg bg-white">
      <div className="flex flex-col">

        <div className="flex flex-row">
          {/* Profile pic */}
          <div className="max-w-xs">
            <ProfileIcon src={contact.image} alt={contact.name} />
            <h1 className="text-3xl font-bold mb-4">{contact.name}</h1>
          </div>
          {/* Contact info */}
          <div className="mt-4 max-w-xs">
            <h2 className="text-xl font-semibold">Contact Info</h2>
            <p>📞 {contact.phone}</p>
            <p>✉️ {contact.email}</p>
          </div>
        </div>

        <p className="text-gray-700 bg-gray-100 rounded-lg shadow-sm p-2 flex-shrink">
          {contact.notes}
        </p>
      </div>

      {/* Timeline */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Timeline</h2>
        <Timeline timelineEvents={timelineEvents} />
      </div>
    </div>
  );
};

export default ContactDetail;
