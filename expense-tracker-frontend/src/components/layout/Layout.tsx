import React, { ReactNode, useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-y-auto scrollbar-hide">
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold tracking-tight">
          💰 {title || "Dashboard"}
        </h1>
        <ThemeToggle />
      </header>
      <div className="w-full">{children}</div>
    </div>
  );
};

const getInitialTheme = (): boolean => {
  if (typeof window === "undefined") return false;

  const saved = localStorage.getItem("theme");
  if (saved === "dark") return true;
  if (saved === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      aria-label="Toggle dark mode"
      className="bg-gray-300 dark:bg-gray-700 p-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-900" />
      )}
    </button>
  );
};
