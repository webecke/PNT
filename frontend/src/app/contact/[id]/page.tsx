"use client";

import { useParams } from "next/navigation";
import { mockContacts } from "../../utils/mockContacts";
import ProfileIcon from "../../components/profileIcon";

const ContactDetail = () => {
  const { id } = useParams();
  const contact = mockContacts.find((c) => c.id.toString() === id);

  if (!contact) return <div>Contact not found.</div>;

  return (
    <div className="flex m-12 p-6 shadow-lg w-max rounded-lg bg-white">
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
          <ul className="list-disc ml-6">
            {contact.timeline.map((event, index) => (
              <li key={index} className="mt-1">
                {event}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
