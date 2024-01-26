// Header.js
import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-300 z-50">
      <nav className="text-black text-center"> 
        <ul className="list-none m-0 p-0 overflow-hidden">
          <li className="inline-block p-2 w-1/5">
            <a
              href="/"
              className="no-underline block hover:bg-gray-200" 
            >
              HOME
            </a>
          </li>
          <li className="inline-block p-2 w-1/5">
            <a
              href="news"
              className="no-underline block hover:bg-gray-200" 
            >
              Another Posting
            </a>
          </li>
          <li className="inline-block p-2 w-1/5">
            <a
              href="contact"
              className="no-underline block hover:bg-gray-200" 
            >
              Profile
            </a>
          </li>
          <li className="inline-block p-2 w-1/5">
            <a
              href="about"
              className="no-underline block hover:bg-gray-200" 
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
``
