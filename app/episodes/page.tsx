'use client'

import { TopNav } from '@/components/top-nav'
import { Download, Play, MoreHorizontal } from 'lucide-react'

const mockEpisodes = [
  {
    id: '1',
    title: 'The Future of Technology',
    show: 'Tech Talk Podcast',
    description: 'Join us as we explore emerging technologies and their impact on society.',
    duration: 2520, // 42 minutes
    date: '2024-01-15',
    image: 'https://picsum.photos/300/300?random=30'
  },
  {
    id: '2',
    title: 'Mental Health in the Digital Age',
    show: 'Wellness Wednesday',
    description: 'A deep dive into how technology affects our mental wellbeing.',
    duration: 3600, // 60 minutes
    date: '2024-01-12',
    image: 'https://picsum.photos/300/300?random=31'
  },
  {
    id: '3',
    title: 'Climate Change Solutions',
    show: 'Earth Matters',
    description: 'Discussing innovative approaches to tackle climate change.',
    duration: 1800, // 30 minutes
    date: '2024-01-10',
    image: 'https://picsum.photos/300/300?random=32'
  }
]

export default function EpisodesPage() {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-full">
      <TopNav />
      
      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Your Episodes</h1>
          <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <Download className="w-5 h-5" />
            <span>Download all</span>
          </button>
        </div>

        {mockEpisodes.length > 0 ? (
          <div className="space-y-4">
            {mockEpisodes.map((episode) => (
              <div
                key={episode.id}
                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <div className="relative w-24 h-24 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={episode.image}
                    alt={episode.show}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white text-black p-2 rounded-full hover:scale-105 transition-transform">
                      <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-lg mb-1 truncate">
                    {episode.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2 truncate">
                    {episode.show}
                  </p>
                  <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                    {episode.description}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-gray-400">
                    <span>{formatDate(episode.date)}</span>
                    <span>•</span>
                    <span>{formatDuration(episode.duration)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Download className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">No episodes downloaded</h3>
            <p className="text-gray-400 mb-6">
              Episodes you download will appear here
            </p>
            <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform">
              Browse podcasts
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 