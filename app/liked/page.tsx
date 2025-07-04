'use client'

import { TopNav } from '@/components/top-nav'
import { Play, Pause, Clock, MoreHorizontal, Heart, Download, Share } from 'lucide-react'
import { mockTracks, usePlayerStore } from '@/lib/store'
import { formatTime } from '@/lib/utils'
import Image from 'next/image'

export default function LikedSongsPage() {
  const { currentTrack, isPlaying, setQueue, setIsPlaying } = usePlayerStore()

  const handlePlayLikedSongs = () => {
    setQueue(mockTracks, 0)
    setIsPlaying(true)
  }

  const handlePlayTrack = (trackIndex: number) => {
    setQueue(mockTracks, trackIndex)
    setIsPlaying(true)
  }

  const isCurrentPlaylist = currentTrack && mockTracks.some(track => track.id === currentTrack.id)

  return (
    <div className="min-h-full">
      <TopNav />
      
      <div className="relative">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-b from-purple-600 via-purple-700 to-transparent">
          <div className="flex items-end gap-6 px-8 pt-16 pb-8">
            <div className="w-60 h-60 bg-gradient-to-br from-purple-700 to-blue-900 rounded-lg flex items-center justify-center shadow-2xl flex-shrink-0">
              <Heart className="w-24 h-24 text-white" fill="currentColor" />
            </div>
            
            <div className="flex-1 min-w-0 pb-4">
              <p className="text-sm font-medium text-white/70 mb-2">Playlist</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4">
                Liked Songs
              </h1>
              <p className="text-white/70 text-sm mb-4">
                Songs you&apos;ve liked will appear here
              </p>
              <div className="flex items-center text-sm text-white/70">
                <span className="font-medium text-white">You</span>
                <span className="mx-1">•</span>
                <span>{mockTracks.length} songs</span>
                <span className="mx-1">•</span>
                <span>
                  {Math.floor(mockTracks.reduce((acc, track) => acc + track.duration, 0) / 60)} min
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-black/20 backdrop-blur-md px-8 py-6">
          <div className="flex items-center gap-6">
            <button
              onClick={handlePlayLikedSongs}
              className="bg-spotify-green text-black p-4 rounded-full hover:scale-105 transition-transform shadow-lg"
            >
              {isCurrentPlaylist && isPlaying ? (
                <Pause className="w-6 h-6" fill="currentColor" />
              ) : (
                <Play className="w-6 h-6 ml-1" fill="currentColor" />
              )}
            </button>
            
            <button className="text-gray-300 hover:text-white transition-colors">
              <Download className="w-8 h-8" />
            </button>
            
            <button className="text-gray-300 hover:text-white transition-colors">
              <Share className="w-8 h-8" />
            </button>
            
            <button className="text-gray-300 hover:text-white transition-colors">
              <MoreHorizontal className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Track List */}
        <div className="px-8 pb-24">
          <div className="bg-black/10 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm mb-2 px-6 py-4 border-b border-white/10">
              <div className="col-span-1 flex justify-center">#</div>
              <div className="col-span-6">TITLE</div>
              <div className="col-span-3">ALBUM</div>
              <div className="col-span-2 flex justify-end">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            
            {/* Tracks */}
            <div>
              {mockTracks.map((track, index) => {
                const isCurrentTrack = currentTrack?.id === track.id
                const isPlayingTrack = isCurrentTrack && isPlaying
                
                return (
                  <div
                    key={track.id}
                    className={`grid grid-cols-12 gap-4 items-center px-6 py-3 rounded-md hover:bg-white/10 group cursor-pointer transition-colors ${
                      isCurrentTrack ? 'bg-white/5' : ''
                    }`}
                    onClick={() => handlePlayTrack(index)}
                  >
                    <div className="col-span-1 flex justify-center">
                      {isPlayingTrack ? (
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="flex space-x-0.5">
                            <div className="w-0.5 h-4 bg-spotify-green animate-pulse"></div>
                            <div className="w-0.5 h-3 bg-spotify-green animate-pulse delay-75"></div>
                            <div className="w-0.5 h-2 bg-spotify-green animate-pulse delay-150"></div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <span className={`text-sm group-hover:hidden ${isCurrentTrack ? 'text-spotify-green' : 'text-gray-400'}`}>
                            {index + 1}
                          </span>
                          <Play className="w-4 h-4 text-white hidden group-hover:block" fill="currentColor" />
                        </>
                      )}
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
                        <h4 className={`text-sm font-medium truncate ${isCurrentTrack ? 'text-spotify-green' : 'text-white'}`}>
                          {track.title}
                        </h4>
                        <p className="text-gray-400 text-xs truncate hover:text-white hover:underline cursor-pointer">
                          {track.artist}
                        </p>
                      </div>
                    </div>
                    
                    <div className="col-span-3 text-gray-400 text-sm truncate hover:text-white hover:underline cursor-pointer">
                      {track.album}
                    </div>
                    
                    <div className="col-span-2 flex items-center justify-end space-x-4">
                      <button className="opacity-0 group-hover:opacity-100 text-spotify-green transition-all">
                        <Heart className="w-4 h-4" fill="currentColor" />
                      </button>
                      <span className="text-gray-400 text-sm">
                        {formatTime(track.duration)}
                      </span>
                      <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 