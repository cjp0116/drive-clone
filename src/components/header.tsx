"use client"

import { Search, Settings, HelpCircle, Sun, Moon } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import Link from 'next/link';

interface HeaderProps {
  isDarkMode: boolean
  toggleTheme: (value: boolean) => void
  searchQuery: string
  setSearchQuery: (value: string) => void
}

export default function Header({ isDarkMode, toggleTheme, searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <header
      className={`border-b p-4 flex items-center gap-4 transition-colors duration-300 ease-in-out ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
        }`}
    >
      <Link href={`/`} className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
          <div className="w-5 h-5 bg-white rounded-sm"></div>
        </div>
        <h1
          className={`text-xl font-medium transition-colors duration-300 ease-in-out ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          Drive
        </h1>
      </Link>

      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-300 ease-in-out ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
          />
          <Input
            placeholder="Search in Drive"
            className={`pl-10 transition-colors duration-300 ease-in-out ${isDarkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className={`transition-all duration-300 ease-in-out ${isDarkMode
            ? "text-gray-400 hover:text-white hover:bg-gray-700"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          onClick={toggleTheme}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`transition-all duration-300 ease-in-out ${isDarkMode
            ? "text-gray-400 hover:text-white hover:bg-gray-700"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
        >
          <Settings className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`transition-all duration-300 ease-in-out ${isDarkMode
            ? "text-gray-400 hover:text-white hover:bg-gray-700"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
        >
          <HelpCircle className="w-4 h-4" />
        </Button>
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder-user.jpg" alt="User" />
          <AvatarFallback
            className={`transition-colors duration-300 ease-in-out ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}
          >
            JD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
