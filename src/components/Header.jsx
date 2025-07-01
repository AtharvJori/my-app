"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, Film } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "TV Shows", href: "/tv-shows" },
    { name: "Favourites", href: "/favourites" },
  ];

  return (
    <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-2xl sticky top-0 z-50 border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <Film className="h-6 w-6 text-black" />
            </div>
            <Link href="/" className="flex flex-col">
              <span className="text-2xl font-black text-yellow-400 tracking-wider">
                IMDb
              </span>
              <span className="text-xs text-gray-400 -mt-1 tracking-widest">
                MOVIES
              </span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for movies, TV shows, celebrities..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-full bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/5 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3 ml-6">
            <Link
              href="/signin"
              className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/5"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
            >
              Join IMDb
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Search Icon */}
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Search className="h-5 w-5 text-gray-300" />
            </button>
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search movies, shows..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-full bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-6 space-y-1 bg-gradient-to-b from-gray-800/95 to-gray-900/95 rounded-xl mt-2 backdrop-blur-sm border border-gray-700/50">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-white/10 border-l-4 border-transparent hover:border-yellow-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-700 mt-4 space-y-2">
              <Link
                href="/signin"
                className="text-gray-300 hover:text-white block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black block px-4 py-3 rounded-lg text-base font-bold transition-all duration-300 text-center shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join IMDb
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
