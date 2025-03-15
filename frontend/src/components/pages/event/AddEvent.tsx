import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { TimelineEvent } from "@/utils/mockTimelineEvents";
import { getOnChangeFunc_ForStringListFormElement } from "@/utils/reactStateUtils";

const AddEvent = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>();
  const [contacts, setContacts] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    const maybeDateString = e.target.value;
    console.log(maybeDateString);
    setDate(maybeDateString ? new Date(maybeDateString) : null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!date) {
      console.log(`No date! Date was: '${date}'`)
      throw new Error("No date");
    }

    const event: TimelineEvent = {
      id: -1,
      name: name,
      date: date.toDateString(),
      desc: description,
      contacts: contacts,
      categories: categories
    };

    // use axios to send data to backend
    console.log("event: ", event);

    // Navigate to home page
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col m-12 p-6 shadow-lg w-max rounded-lg bg-white">
        <h2 className="text-5xl font-bold">Add Event</h2>
        <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label
              htmlFor="event_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Event name
            </label>
            <input
              type="text"
              id="event_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Quidditch Match"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="event_categories"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                type="text"
                id="event_categories"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="memory, friends, school"
                onChange={getOnChangeFunc_ForStringListFormElement(setCategories)}
              />
            </div>
            <div>
              <label
                htmlFor="event_date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last name
              </label>
              <input
                type="date"
                id="event_date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={onChangeDate}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="event_contacts"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Event Attendees
            </label>
            <input
              type="text"
              id="event_contacts"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Harry Potter, Hermione Granger"
              onChange={getOnChangeFunc_ForStringListFormElement(setContacts)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="event_description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Event Notes
            </label>
            <input
              type="text"
              id="event_description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Puddlemere United played the Ballycastle Bats with..."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-max px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
