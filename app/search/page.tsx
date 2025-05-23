'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { TopNav } from '@/components/top-nav'
import { PlaylistCard } from '@/components/playlist-card'
import { Play } from 'lucide-react'
import { mockPlaylists, mockTracks, usePlayerStore } from '@/lib/store'
import { formatTime } from '@/lib/utils'
import Image from 'next/image'

const genres = [
  { name: 'Pop', color: 'bg-pink-500', image: 'https://picsum.photos/300/300?random=20' },
  { name: 'Rock', color: 'bg-orange-500', image: 'https://picsum.photos/300/300?random=21' },
  { name: 'Hip-Hop', color: 'bg-purple-500', image: 'https://picsum.photos/300/300?random=22' },
  { name: 'Jazz', color: 'bg-blue-500', image: 'https://picsum.photos/300/300?random=23' },
  { name: 'Electronic', color: 'bg-green-500', image: 'https://picsum.photos/300/300?random=24' },
  { name: 'Country', color: 'bg-yellow-500', image: 'https://picsum.photos/300/300?random=25' },
  { name: 'R&B', color: 'bg-red-500', image: 'https://picsum.photos/300/300?random=26' },
  { name: 'Classical', color: 'bg-indigo-500', image: 'https://picsum.photos/300/300?random=27' },
]

function SearchContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const { setQueue, setIsPlaying } = usePlayerStore()

  useEffect(() => {
    const query = searchParams.get('q') || ''
    setSearchQuery(query)
  }, [searchParams])
  
  const filteredPlaylists = searchQuery 
    ? mockPlaylists.filter(playlist => 
        playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const filteredTracks = searchQuery
    ? mockTracks.filter(track =>
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.album.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const handlePlayTrack = (trackIndex: number) => {
    setQueue(filteredTracks, trackIndex)
    setIsPlaying(true)
  }

  return (
    <div className="px-8 py-6">
      {searchQuery ? (
        /* Search Results */
        <div>
          <h1 className="text-2xl font-bold text-white mb-8">
            Search results for &quot;{searchQuery}&quot;
          </h1>

          {/* Top Result */}
          {(filteredTracks.length > 0 || filteredPlaylists.length > 0) && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Top result</h2>
              <div className="bg-spotify-gray hover:bg-gray-700 p-6 rounded-lg cursor-pointer transition-colors group max-w-md">
                {filteredTracks.length > 0 ? (
                  <div onClick={() => handlePlayTrack(0)}>
                    <div className="relative w-24 h-24 bg-gray-800 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={filteredTracks[0].albumArt}
                        alt={filteredTracks[0].album}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="bg-spotify-green text-black p-3 rounded-full hover:scale-105 transition-transform">
                          <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-2">{filteredTracks[0].title}</h3>
                    <p className="text-gray-400 mb-1">Song • {filteredTracks[0].artist}</p>
                    <p className="text-gray-400 text-sm">{formatTime(filteredTracks[0].duration)}</p>
                  </div>
                ) : (
                  <div>
                    <div className="relative w-24 h-24 bg-gray-800 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={filteredPlaylists[0].coverImage}
                        alt={filteredPlaylists[0].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-2">{filteredPlaylists[0].name}</h3>
                    <p className="text-gray-400 mb-1">Playlist • {filteredPlaylists[0].createdBy}</p>
                    <p className="text-gray-400 text-sm">{filteredPlaylists[0].tracks.length} songs</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Songs Section */}
          {filteredTracks.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Songs</h2>
              <div className="space-y-2">
                {filteredTracks.slice(0, 6).map((track, index) => (
                  <div
                    key={track.id}
                    className="flex items-center space-x-3 p-3 rounded-md hover:bg-white/10 cursor-pointer transition-colors group"
                    onClick={() => handlePlayTrack(index)}
                  >
                    <div className="relative w-12 h-12 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={track.albumArt}
                        alt={track.album}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-3 h-3 text-white ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-medium truncate">
                        {track.title}
                      </h4>
                      <p className="text-gray-400 text-xs truncate">
                        {track.artist}
                      </p>
                    </div>
                    <div className="text-gray-400 text-xs">
                      {formatTime(track.duration)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Playlists Section */}
          {filteredPlaylists.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Playlists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </section>
          )}

          {filteredPlaylists.length === 0 && filteredTracks.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-white text-xl font-semibold mb-2">No results found</h3>
              <p className="text-gray-400">Try different keywords or check your spelling</p>
            </div>
          )}
        </div>
      ) : (
        /* Browse Categories */
        <div>
          <h1 className="text-2xl font-bold text-white mb-6">Search</h1>
          <p className="text-gray-400 mb-8">Find your favorite songs, artists, albums, podcasts and playlists</p>
          
          <h2 className="text-2xl font-bold text-white mb-6">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {genres.map((genre) => (
              <div
                key={genre.name}
                className={`relative ${genre.color} rounded-lg p-4 h-32 cursor-pointer hover:scale-105 transition-transform overflow-hidden`}
              >
                <h3 className="text-white text-lg font-bold">{genre.name}</h3>
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-black/20 rounded-lg transform rotate-12">
                  <Image
                    src={genre.image}
                    alt={genre.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Made for you */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Made for you</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {mockPlaylists.slice(0, 5).map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-full">
      <TopNav />
      <Suspense fallback={<div className="p-8 text-white">Loading...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  )
} 