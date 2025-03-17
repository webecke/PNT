'use client';

import Link from "next/link";
import ContactList from "@/components/contact/contactList";
import React, { useState } from "react";
import EventList from "@/components/event/eventList";

export default function Home() {
  const [content, setContent] = useState<"contacts" | "events">("contacts");
  const [category, setCategory] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(category);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-6 space-y-6 flex-shrink-0">
        <div className="text-3xl font-bold">Menu</div>
        <button
          onClick={() => setContent("contacts")}
          className={`w-full px-4 py-2 text-lg font-semibold rounded-md ${
            content === "contacts" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Contacts
        </button>
        <button
          onClick={() => setContent("events")}
          className={`w-full px-4 py-2 text-lg font-semibold rounded-md ${
            content === "events" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Events
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-6 overflow-hidden">
        <div className="text-5xl mb-6">Welcome to Personal Network Tracker</div>

        {/* Header and Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-5xl font-bold">
            {content === "contacts" ? "Contacts" : "Events"}
          </div>
          <form className="relative" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Filter by category..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange = {e => setCategory(e.target.value)}
            />
          </form>

          {content === "contacts" && (
            <Link
              href="/addContact"
              className="px-4 py-2 rounded-md shadow-md bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Add Contact
            </Link>
          )}
          {content === "events" && (
            <Link
              href="/addEvent"
              className="px-4 py-2 rounded-md shadow-md bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Add Event
            </Link>
          )}
        </div>

        {/* Conditional Rendering of Lists */}
        <div className="flex-1 overflow-x-hidden">
          {content === "contacts" ? <ContactList category={category}  /> : <EventList category={category}/>}
        </div>
      </div>
    </div>
  );
}
