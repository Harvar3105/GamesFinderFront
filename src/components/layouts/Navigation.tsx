"use client";

import Link from "next/link";
import { useUser } from "../providers/UserProvider";
import ThemeSwitcher from "../theme/ThemeSwitcher";

export default function Navigation() {
  const { user, setUser } = useUser();
  return (
    <nav className="navbar flex items-center justify-between gap-5 px-5 py-3 border-b bg-white dark:bg-[#1a1a1e] border-b-gray-300 dark:border-b-gray-600">
      <ul className="flex gap-6">
        <li className="rounded bg-amber-300 dark:bg-[#33353b] p-2">
          <Link href="/">
            <svg
              className="w-7 h-7 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </li>
        <li>
          {user ? (
            <span>Hi, {user.username}</span>
          ) : (
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          )}
        </li>
      </ul>
      <div className="flex items-center justify-around gap-5">
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
