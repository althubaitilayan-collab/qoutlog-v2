"use client";

import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "./ui/button";
import { Moon, Sun, Globe } from "lucide-react";
import { useEffect, useState } from "react";

export function LanguageThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setLanguage(language === "en" ? "ar" : "en")}
        className="w-10 h-10 rounded-full"
      >
        <Globe className="w-5 h-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-10 h-10 rounded-full"
      >
        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </Button>
    </div>
  );
}