"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export const ToggleTheme = ({ ...props }) => {
  const { setTheme } = useTheme();

  const setToDark = () => setTheme("dark");
  const setToLight = () => setTheme("light");

  return (
    <div {...props}>
      <Sun
        className="h-4 w-4 text-yellow-500 dark:hidden"
        onClick={setToDark}
      />
      <Moon
        className="h-4 w-4 text-gray-300 hidden dark:block"
        onClick={setToLight}
      />
    </div>
  );
};
