'use client'

import { ChevronLeft, ChevronRight, Search, User } from 'lucide-react'
import { useState } from 'react'

export function TopNav() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="flex items-center justify-between bg-spotify-black/80 backdrop-blur-md p-4 sticky top-0 z-10">
      {/* Navigation Buttons */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-black placeholder-gray-600 rounded-full py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-4">
        <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
          Upgrade
        </button>
        <button className="flex items-center space-x-2 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
          <User className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
} 