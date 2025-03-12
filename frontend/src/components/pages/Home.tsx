// noinspection HtmlUnknownTarget

import Link from "next/link";
import ContactList from "@/components/contactList";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="text-5xl m-4">Welcome to Personal Network Tracker</div>

      <div className="flex justify-center items-center">
        <h2 className="text-5xl font-bold">Contacts</h2>
        <div className="flex justify-end p-4 ml-12">
          <Link
            href="/addContact"
            className="px-6 py-3 rounded-lg shadow-md bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Add Contact
          </Link>
        </div>
        <div className="flex justify-end p-4 ml-12">
          <Link
            href="/addEvent"
            className="px-6 py-3 rounded-lg shadow-md bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Add Event
          </Link>
        </div>
      </div>
      <ContactList />
    </div>
  );
}
