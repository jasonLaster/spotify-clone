'use client'

import { TopNav } from '@/components/top-nav'
import { PlaylistCard } from '@/components/playlist-card'
import { mockPlaylists, mockTracks, usePlayerStore } from '@/lib/store'
import { Play, Clock } from 'lucide-react'
import Image from 'next/image'
import { formatTime } from '@/lib/utils'

export default function Home() {
  const { setQueue, setIsPlaying } = usePlayerStore()

  const handlePlayTrack = (trackIndex: number) => {
    setQueue(mockTracks, trackIndex)
    setIsPlaying(true)
  }

  return (
    <div className="min-h-full">
      <TopNav />
      
      <div className="px-8 py-6">
        {/* Good Morning Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Good afternoon</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPlaylists.slice(0, 6).map((playlist) => (
              <div
                key={playlist.id}
                className="group bg-white/10 hover:bg-white/20 rounded-md flex items-center transition-all duration-300 cursor-pointer"
                onClick={() => setQueue(playlist.tracks, 0)}
              >
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={playlist.coverImage}
                    alt={playlist.name}
                    fill
                    className="object-cover rounded-l-md"
                  />
                </div>
                <div className="flex-1 px-4">
                  <h3 className="text-white font-semibold truncate">{playlist.name}</h3>
                </div>
                <button className="mr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-spotify-green text-black p-3 rounded-full hover:scale-105 transition-transform">
                    <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Made for You Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Made for you</h2>
            <button className="text-gray-400 hover:text-white text-sm font-medium">
              Show all
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {mockPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>

        {/* Recently Played Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recently played</h2>
            <button className="text-gray-400 hover:text-white text-sm font-medium">
              Show all
            </button>
          </div>
          
          <div className="bg-black/20 rounded-lg p-6">
            <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm mb-4 px-4">
              <div className="col-span-1">#</div>
              <div className="col-span-6">TITLE</div>
              <div className="col-span-3">ALBUM</div>
              <div className="col-span-2 flex justify-end">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            
            <hr className="border-gray-800 mb-4" />
            
            <div className="space-y-2">
              {mockTracks.map((track, index) => (
                <div
                  key={track.id}
                  className="grid grid-cols-12 gap-4 items-center px-4 py-2 rounded-md hover:bg-white/10 group cursor-pointer transition-colors"
                  onClick={() => handlePlayTrack(index)}
                >
                  <div className="col-span-1 text-gray-400 group-hover:hidden">
                    {index + 1}
                  </div>
                  <div className="col-span-1 hidden group-hover:block">
                    <Play className="w-4 h-4 text-white" fill="currentColor" />
                  </div>
                  
                  <div className="col-span-6 flex items-center space-x-3">
                    <div className="relative w-10 h-10 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={track.albumArt}
                        alt={track.album}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white text-sm font-medium truncate">
                        {track.title}
                      </h4>
                      <p className="text-gray-400 text-xs truncate">
                        {track.artist}
                      </p>
                    </div>
                  </div>
                  
                  <div className="col-span-3 text-gray-400 text-sm truncate">
                    {track.album}
                  </div>
                  
                  <div className="col-span-2 text-gray-400 text-sm text-right">
                    {formatTime(track.duration)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
