// Header.js
import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-gray-50 border-b border-gray-300 z-50">
      <nav className="bg-gray-800 text-center">
        <ul className="list-none m-0 p-0 overflow-hidden">
          <li className="inline-block p-2 w-1/5">
            <a
              href="/"
              className="text-white no-underline block hover:bg-gray-900"
            >
              HOME
            </a>
          </li>
          <li className="inline-block p-2 w-1/5">
            <a
              href="news"
              className="text-white no-underline block hover:bg-gray-900"
            >
              Another Posting
            </a>
          </li>
          <li className="inline-block p-2 w-1/5">
            <a
              href="contact"
              className="text-white no-underline block hover:bg-gray-900"
            >
              Profile
            </a>
          </li>
          <li className="inline-block p-2 w-1/5">
            <a
              href="about"
              className="text-white no-underline block hover:bg-gray-900"
            >
              GOOD...
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
