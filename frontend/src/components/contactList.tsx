import Link from "next/link";
import { mockContacts } from "@/utils/mockContacts";

const ContactList = () => {
  return (
    <div className="w-1/2 mx-auto">
      <ul className="border rounded-lg p-4 bg-white shadow">
        {mockContacts.map((contact) => (
          <li
            key={contact.id}
            className="p-2 border-b hover:bg-gray-100 transition"
          >
            <Link href={`/contact/${contact.id}`}>
              <div className="cursor-pointer flex justify-between items-center">
                <span className="font-semibold">{contact.name}</span>
                <span className="text-gray-500">{contact.phone}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
