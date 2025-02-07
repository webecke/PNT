import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="text-5xl m-4">Welcome to Personal Network Tracker</div>
      <div className="text-3xl m-4">Your key to success</div>
      <div className="bg-gray-800 text-white hover:bg-gray-400 text-center mt-56 p-5 w-fit mx-auto rounded-lg cursor-pointer">
        Get Started
      </div>
    </div>
  );
}
