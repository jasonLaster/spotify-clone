'use client'

import { Play, Clock, MoreHorizontal, Heart } from 'lucide-react'
import Image from 'next/image'
import { Track, usePlayerStore } from '@/lib/store'
import { formatTime } from '@/lib/utils'

interface TrackListProps {
  tracks: Track[]
  showHeader?: boolean
  showAlbumArt?: boolean
  showAlbum?: boolean
  showAddedDate?: boolean
  onPlayTrack?: (index: number) => void
}

export function TrackList({ 
  tracks, 
  showHeader = true, 
  showAlbumArt = true,
  showAlbum = true,
  showAddedDate = false,
  onPlayTrack
}: TrackListProps) {
  const { currentTrack, isPlaying, setQueue, setIsPlaying } = usePlayerStore()

  const handlePlayTrack = (index: number) => {
    if (onPlayTrack) {
      onPlayTrack(index)
    } else {
      setQueue(tracks, index)
      setIsPlaying(true)
    }
  }

  return (
    <div className="bg-black/10 rounded-lg overflow-hidden">
      {/* Header */}
      {showHeader && (
        <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm mb-2 px-6 py-4 border-b border-white/10">
          <div className="col-span-1 flex justify-center">#</div>
          <div className={showAlbumArt ? "col-span-5" : "col-span-6"}>TITLE</div>
          {showAlbumArt && <div className="col-span-1"></div>}
          {showAlbum && <div className="col-span-3">ALBUM</div>}
          {showAddedDate && <div className="col-span-2">DATE ADDED</div>}
          <div className="col-span-2 flex justify-end">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      )}
      
      {/* Tracks */}
      <div className="space-y-1">
        {tracks.map((track, index) => {
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
              
              <div className={`${showAlbumArt ? 'col-span-5' : 'col-span-6'} flex items-center space-x-3`}>
                {showAlbumArt && (
                  <div className="relative w-10 h-10 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={track.albumArt}
                      alt={track.album}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className={`text-sm font-medium truncate ${isCurrentTrack ? 'text-spotify-green' : 'text-white'}`}>
                    {track.title}
                  </h4>
                  <p className="text-gray-400 text-xs truncate hover:text-white hover:underline cursor-pointer">
                    {track.artist}
                  </p>
                </div>
              </div>
              
              {showAlbum && (
                <div className="col-span-3 text-gray-400 text-sm truncate hover:text-white hover:underline cursor-pointer">
                  {track.album}
                </div>
              )}
              
              {showAddedDate && (
                <div className="col-span-2 text-gray-400 text-sm">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              )}
              
              <div className="col-span-2 flex items-center justify-end space-x-4">
                <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all">
                  <Heart className="w-4 h-4" />
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
  )
} 