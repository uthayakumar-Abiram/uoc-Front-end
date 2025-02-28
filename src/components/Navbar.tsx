"use client"
import Image from "next/image";
import logo from "../../public/logos/uoc-logo.png";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const userToken = localStorage.getItem("user"); 
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header>
      <nav className="bg-purple-700">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={logo}
                alt="Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-white font-bold text-xl">AskTech</span>
            </Link>
          </div>

          {/* Toggle Button (for mobile view) */}
          <button
            className="lg:hidden text-white focus:outline-none"
            type="button"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Links */}
          <div className="hidden lg:flex space-x-6 items-center">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/service" className="text-white hover:text-gray-300">
              Services
            </Link>
            {!isLoggedIn ? (
              <Link href="/login" className="text-white hover:text-gray-300">
                Log in
              </Link>
            ) : (
              <Link href="/profile" className="flex items-center space-x-2">
                <span className="text-white hover:text-gray-300">Profile</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
