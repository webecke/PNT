'use client';

import { useUserContext } from '@/contexts/user-context';
import { LogoutPresenter } from '@/presenter/authentication/LogoutPresenter';
import { NavigableView } from '@/presenter/Presenter';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Header() {
  const { user, setUser, setContacts } = useUserContext();
  const router = useRouter();

  const listener: NavigableView = {
    navigateTo: (url) => router.push(url),
  };
  
  const presenter = useRef(new LogoutPresenter(listener));

  const logout = async () => {
    const response = await presenter.current.logout();;
    console.log("Logged out, response: ", response);
    if (response) {
      setUser(undefined);
    } else {
      console.error('Logout failed');
    }
  }
  return (
    <header className="w-screen overflow-auto bg-gray-800 text-white">
      <div className="flex justify-between items-center">
        {/* Left Section: Title and Navigation */}
        <div className="flex items-center">
          <div className="text-3xl py-4 ml-4 max-sm:hidden">Personal Network Tracker</div>
          <nav className="p-1">
            <ul className="flex space-x-5 p-1">
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Contacts
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-gray-300">
                  Schedule
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Section: Sign Up and Login */}
        <div className="flex space-x-6 mr-6">
          {user ? (
            <div onClick={logout} className="cursor-pointer">Log out</div>
          ) : (
            <>
              <Link href="/signup" className="hover:text-gray-300">
                Signup
              </Link>
              <Link href="/login" className="hover:text-gray-300">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
