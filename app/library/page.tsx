'use client'

import { useState } from 'react'
import { TopNav } from '@/components/top-nav'
import { PlaylistCard } from '@/components/playlist-card'
import { TrackList } from '@/components/track-list'
import { Grid, List, Search, Plus, ArrowUpDown } from 'lucide-react'
import { mockPlaylists, mockTracks, usePlayerStore } from '@/lib/store'
import Link from 'next/link'
import Image from 'next/image'

const filterOptions = ['All', 'Playlists', 'Artists', 'Albums', 'Songs', 'Recently Played']
const sortOptions = ['Recently Added', 'Alphabetical', 'Creator']

export default function LibraryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Recently Added')
  const [showSortMenu, setShowSortMenu] = useState(false)
  const { setQueue, setIsPlaying } = usePlayerStore()

  const filteredPlaylists = mockPlaylists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredTracks = mockTracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.album.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handlePlayTrack = (trackIndex: number) => {
    setQueue(mockTracks, trackIndex)
    setIsPlaying(true)
  }

  const handleSort = (option: string) => {
    setSortBy(option)
    setShowSortMenu(false)
  }

  const getFilteredContent = () => {
    switch (activeFilter) {
      case 'Playlists':
        return { playlists: filteredPlaylists, tracks: [] }
      case 'Songs':
        return { playlists: [], tracks: filteredTracks }
      case 'Recently Played':
        return { playlists: [], tracks: filteredTracks }
      default:
        return { playlists: filteredPlaylists, tracks: filteredTracks }
    }
  }

  const { playlists, tracks } = getFilteredContent()

  return (
    <div className="min-h-full">
      <TopNav />
      
      <div className="px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Your Library</h1>
          <div className="flex items-center space-x-4">
            <Link href="/create">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Plus className="w-6 h-6" />
              </button>
            </Link>
            {/* Only show view mode toggle for certain filters */}
            {(activeFilter === 'All' || activeFilter === 'Playlists') && (
              <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search in Your Library"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white placeholder-gray-400 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center space-x-1 text-gray-400 hover:text-white text-sm"
              >
                <ArrowUpDown className="w-4 h-4" />
                <span>{sortBy}</span>
              </button>
              {showSortMenu && (
                <div className="absolute right-0 top-full mt-2 bg-gray-800 rounded-lg shadow-lg py-2 z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSort(option)}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        {activeFilter === 'Songs' ? (
          /* Songs List */
          <div>
            <TrackList 
              tracks={tracks} 
              showHeader={true}
              showAlbumArt={true}
              showAlbum={true}
              showAddedDate={true}
              onPlayTrack={handlePlayTrack}
            />
          </div>
        ) : activeFilter === 'Recently Played' ? (
          /* Recently Played Tracks */
          <div>
            <TrackList 
              tracks={tracks} 
              showHeader={true}
              showAlbumArt={true}
              showAlbum={true}
              showAddedDate={false}
              onPlayTrack={handlePlayTrack}
            />
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {/* Liked Songs */}
            <Link href="/liked">
              <div className="group bg-gradient-to-br from-purple-700 to-blue-900 hover:from-purple-600 hover:to-blue-800 p-6 rounded-lg transition-all duration-300 cursor-pointer">
                <div className="relative mb-4">
                  <div className="w-full aspect-square bg-gradient-to-br from-purple-700 to-blue-900 rounded-md flex items-center justify-center">
                    <span className="text-white text-4xl">♥</span>
                  </div>
                </div>
                <h3 className="text-white font-bold text-base mb-1">Liked Songs</h3>
                <p className="text-gray-300 text-sm">50 liked songs</p>
              </div>
            </Link>

            {/* Playlists */}
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {/* Liked Songs */}
            <Link href="/liked">
              <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white/10 cursor-pointer transition-colors group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-700 to-blue-900 rounded-md flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">♥</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-base">Liked Songs</h3>
                  <p className="text-gray-400 text-sm">Playlist • 50 songs</p>
                </div>
                <div className="text-gray-400 text-sm">
                  2 hours ago
                </div>
              </div>
            </Link>

            {/* Playlists */}
            {playlists.map((playlist) => (
              <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white/10 cursor-pointer transition-colors group">
                  <div className="relative w-16 h-16 bg-gray-800 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={playlist.coverImage}
                      alt={playlist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-base truncate">{playlist.name}</h3>
                    <p className="text-gray-400 text-sm">
                      Playlist • {playlist.createdBy} • {playlist.tracks.length} songs
                    </p>
                  </div>
                  <div className="text-gray-400 text-sm">
                    3 days ago
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {playlists.length === 0 && tracks.length === 0 && searchQuery && (
          <div className="text-center py-16">
            <h3 className="text-white text-xl font-semibold mb-2">No results found</h3>
            <p className="text-gray-400">Try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  )
} 