'use client'

import Link from 'next/link'
import { Home, Search, Library, Plus, Heart, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockPlaylists } from '@/lib/store'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Your Library', href: '/library', icon: Library },
]

const library = [
  { name: 'Create Playlist', href: '/create', icon: Plus },
  { name: 'Liked Songs', href: '/liked', icon: Heart },
  { name: 'Your Episodes', href: '/episodes', icon: Download },
]

export function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-black text-gray-300 p-6">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
          <span className="text-black font-bold text-lg">♪</span>
        </div>
        <span className="text-white text-xl font-bold">Spotify</span>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-2 mb-8">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
              "hover:text-white hover:bg-gray-800",
              item.href === '/' && "text-white bg-gray-800"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Library Section */}
      <div className="space-y-2 mb-8">
        {library.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-white hover:bg-gray-800"
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </div>

      <hr className="border-gray-700 mb-4" />

      {/* Playlists */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1">
          {mockPlaylists.map((playlist) => (
            <Link
              key={playlist.id}
              href={`/playlist/${playlist.id}`}
              className="block px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors truncate"
            >
              {playlist.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Install App */}
      <div className="mt-8 pt-4 border-t border-gray-700">
        <button className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
          <Download className="mr-3 h-5 w-5" />
          Install App
        </button>
      </div>
    </div>
  )
} 