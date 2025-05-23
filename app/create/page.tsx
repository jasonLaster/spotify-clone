'use client'

import { useState } from 'react'
import { TopNav } from '@/components/top-nav'
import { ArrowLeft, Camera } from 'lucide-react'
import Link from 'next/link'

export default function CreatePlaylistPage() {
  const [playlistName, setPlaylistName] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div className="min-h-full">
      <TopNav />
      
      <div className="px-8 py-6">
        <Link href="/library" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Library
        </Link>
        
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-white mb-8">Create playlist</h1>
          
          <div className="flex items-start space-x-8 mb-8">
            <div className="w-48 h-48 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-gray-600 transition-colors group">
              <div className="text-center">
                <Camera className="w-12 h-12 text-gray-400 group-hover:text-white mx-auto mb-2" />
                <p className="text-gray-400 group-hover:text-white text-sm">Choose photo</p>
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Add a name"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  className="w-full bg-transparent text-white text-3xl font-bold placeholder-gray-400 border-none focus:outline-none"
                />
              </div>
              
              <div>
                <textarea
                  placeholder="Add an optional description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full bg-transparent text-gray-300 placeholder-gray-400 resize-none border-none focus:outline-none"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className="bg-white text-black px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform"
              disabled={!playlistName.trim()}
            >
              Create
            </button>
            <Link href="/library">
              <button className="text-gray-400 hover:text-white px-8 py-3 font-medium transition-colors">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 