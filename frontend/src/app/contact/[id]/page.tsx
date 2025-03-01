"use client";

import { useParams } from "next/navigation";
import { mockContacts } from "../../utils/mockContacts";
import { getMockTimeline } from "../../utils/mockTimelineEvents";
import ProfileIcon from "../../components/profileIcon";
import Timeline from "@/app/components/timeline/timeline";

const ContactDetail = () => {
  const { id } = useParams();
  const contact = mockContacts.find((c) => c.id.toString() === id);

  if (!contact) return <div>Contact not found.</div>;

  const timelineEvents = getMockTimeline(contact);

  return (
    <div className="flex m-12 p-6 shadow-lg rounded-lg bg-white">
      <div className="max-w-xs ">
        <ProfileIcon src={contact.image} alt={contact.name} />
        <h1 className="text-3xl font-bold mb-4">{contact.name}</h1>
        <p className="text-gray-700 bg-gray-100 rounded-lg shadow-sm p-2">
          {contact.notes}
        </p>
      </div>
      <div className="ml-6">
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Contact Info</h2>
          <p>📞 {contact.phone}</p>
          <p>✉️ {contact.email}</p>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Timeline</h2>
          <Timeline timelineEvents={timelineEvents} />
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
