import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white">
      <div className="flex justify-between items-center">
        {/* Left Section: Title and Navigation */}
        <div className="flex items-center">
          <div className="text-3xl py-4 ml-4">Personal Network Tracker</div>
          <nav className="ml-16">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-gray-300">
                  Contacts
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-gray-300">
                  Schedule
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Section: Sign Up and Login */}
        <div className="flex space-x-6 mr-6">
          <Link href="/signup" className="hover:text-gray-300">
            Sign Up
          </Link>
          <Link href="/login" className="hover:text-gray-300">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
