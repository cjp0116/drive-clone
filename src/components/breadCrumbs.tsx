"use client"

import { ChevronRight } from "lucide-react"

interface BreadcrumbProps {
  currentPath: string[]
  isDarkMode: boolean
}
import Link from 'next/link';

export default function Breadcrumb({ currentPath,  isDarkMode }: BreadcrumbProps) {
  return (
    <div
      className={`px-6 py-4 border-b transition-colors duration-300 ease-in-out ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"}`}
    >
      <div className="flex items-center gap-1 text-sm">
        {currentPath.map(({ name, id }, index) => (
          <Link href={`/${id}`} key={index} className="flex items-center gap-1">
            <button
              className={`transition-colors duration-300 ease-in-out ${isDarkMode
                  ? "text-gray-300 hover:text-white hover:underline"
                  : "text-gray-600 hover:text-gray-900 hover:underline"
                }`}
            >
              {name}
            </button>
            {index < currentPath.length - 1 && (
              <ChevronRight
                className={`w-4 h-4 transition-colors duration-300 ease-in-out ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
