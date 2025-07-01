"use client";
import Link from "next/link";
import { Search, Film } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import ClerkAuthButtons from "./ClerkAuthButtons";
import { useAuth } from "@clerk/nextjs";

const Header = () => {
  const { isSignedIn } = useAuth();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "TV Shows", href: "/tv-shows" },
    { name: "Favourites", href: "/favourites" },
    { name: "About", href: "/about" },
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

          {/* Search Bar - Desktop & Tablet */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
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
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems
              .filter((item) => item.name !== "Favourites" || isSignedIn)
              .map((item) => (
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

          {/* Desktop Auth Buttons & Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-3 ml-6">
            <ThemeToggle />
            <ClerkAuthButtons />
          </div>

          {/* Mobile/Tablet - Simple Navigation */}
          <div className="lg:hidden flex items-center space-x-1">
            <ThemeToggle />
            <ClerkAuthButtons />
            <Link
              href="/search"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-gray-300" />
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
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

        {/* Mobile Navigation Links - Always Visible */}
        <div className="lg:hidden pb-4">
          <nav className="flex flex-wrap gap-2 justify-center">
            {navItems
              .filter((item) => item.name !== "Favourites" || isSignedIn)
              .map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 border border-gray-700/30 hover:border-yellow-400/50"
                >
                  {item.name}
                </Link>
              ))}
          </nav>
          <div className="flex justify-center mt-3">
            <Link
              href="/signup"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 shadow-lg"
            >
              Join IMDb
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
