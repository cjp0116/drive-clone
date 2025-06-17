"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Folder, FileText, FileImage, FileVideo, FileAudio, File } from "lucide-react"

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("theme");
            return saved ? (saved as Theme) : "dark";
        }
        return "dark";
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode : theme === "dark" }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
}; 

export const getFileIcon = (type: string) => {
    switch (type) {
        case "folder":
            return <Folder className="w-8 h-8 text-blue-500" />
        case "document":
            return <FileText className="w-8 h-8 text-blue-600" />
        case "image":
            return <FileImage className="w-8 h-8 text-green-600" />
        case "video":
            return <FileVideo className="w-8 h-8 text-red-600" />
        case "audio":
            return <FileAudio className="w-8 h-8 text-purple-600" />
        default:
            return <File className="w-8 h-8 text-gray-600" />
    }
}
