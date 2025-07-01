"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="p-2 rounded-lg border border-gray-600 bg-gray-800/50 backdrop-blur-sm">
        <div className="h-5 w-5" />
      </div>
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-gray-600 dark:border-gray-500 bg-gray-800/50 dark:bg-gray-700/50 hover:bg-gray-700/70 dark:hover:bg-gray-600/70 transition-all duration-300 backdrop-blur-sm group"
      aria-label="Toggle theme"
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
      ) : (
        <Moon className="h-5 w-5 text-gray-300 group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
