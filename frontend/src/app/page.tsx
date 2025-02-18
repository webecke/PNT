import Image from "next/image";
import ContactList from "./components/contactList";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="text-5xl m-4">Welcome to Personal Network Tracker</div>
      <div className="text-3xl m-4">Your key to success</div>
      <div className="flex justify-center">
        <ContactList />
      </div>
    </div>
  );
}
