import { create } from 'zustand'

export interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: number
  albumArt: string
  audioUrl: string
}

export interface Playlist {
  id: string
  name: string
  description: string
  coverImage: string
  tracks: Track[]
  createdBy: string
}

interface PlayerState {
  currentTrack: Track | null
  isPlaying: boolean
  currentTime: number
  volume: number
  queue: Track[]
  currentIndex: number
  shuffle: boolean
  repeat: 'off' | 'track' | 'playlist'
  
  // Actions
  setCurrentTrack: (track: Track) => void
  setIsPlaying: (playing: boolean) => void
  setCurrentTime: (time: number) => void
  setVolume: (volume: number) => void
  setQueue: (tracks: Track[], startIndex?: number) => void
  nextTrack: () => void
  previousTrack: () => void
  toggleShuffle: () => void
  toggleRepeat: () => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  volume: 0.7,
  queue: [],
  currentIndex: 0,
  shuffle: false,
  repeat: 'off',

  setCurrentTrack: (track) => set({ currentTrack: track }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setVolume: (volume) => set({ volume }),
  
  setQueue: (tracks, startIndex = 0) => set({ 
    queue: tracks, 
    currentIndex: startIndex,
    currentTrack: tracks[startIndex] || null
  }),
  
  nextTrack: () => {
    const { queue, currentIndex, shuffle, repeat } = get()
    if (queue.length === 0) return
    
    let nextIndex = currentIndex
    
    if (repeat === 'track') {
      // Stay on the same track
    } else if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length)
    } else {
      nextIndex = currentIndex + 1
      if (nextIndex >= queue.length) {
        if (repeat === 'playlist') {
          nextIndex = 0
        } else {
          return // End of playlist
        }
      }
    }
    
    set({
      currentIndex: nextIndex,
      currentTrack: queue[nextIndex],
      currentTime: 0
    })
  },
  
  previousTrack: () => {
    const { queue, currentIndex } = get()
    if (queue.length === 0) return
    
    const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : queue.length - 1
    set({
      currentIndex: prevIndex,
      currentTrack: queue[prevIndex],
      currentTime: 0
    })
  },
  
  toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),
  
  toggleRepeat: () => set((state) => {
    const nextRepeat = state.repeat === 'off' ? 'playlist' : state.repeat === 'playlist' ? 'track' : 'off'
    return { repeat: nextRepeat }
  })
}))

// Mock data for demo
export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    albumArt: 'https://picsum.photos/300/300?random=1',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '2',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 174,
    albumArt: 'https://picsum.photos/300/300?random=2',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: '3',
    title: 'good 4 u',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 178,
    albumArt: 'https://picsum.photos/300/300?random=3',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: '4',
    title: 'Stay',
    artist: 'The Kid LAROI, Justin Bieber',
    album: 'Stay',
    duration: 141,
    albumArt: 'https://picsum.photos/300/300?random=4',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    id: '5',
    title: 'Anti-Hero',
    artist: 'Taylor Swift',
    album: 'Midnights',
    duration: 200,
    albumArt: 'https://picsum.photos/300/300?random=5',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  }
]

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Today\'s Top Hits',
    description: 'The biggest hits in the world, updated daily.',
    coverImage: 'https://picsum.photos/300/300?random=10',
    tracks: mockTracks,
    createdBy: 'Spotify'
  },
  {
    id: '2',
    name: 'RapCaviar',
    description: 'New music from Drake, Lil Baby, and all your favorites.',
    coverImage: 'https://picsum.photos/300/300?random=11',
    tracks: mockTracks.slice(0, 3),
    createdBy: 'Spotify'
  },
  {
    id: '3',
    name: 'Rock Classics',
    description: 'Rock legends & epic songs.',
    coverImage: 'https://picsum.photos/300/300?random=12',
    tracks: mockTracks.slice(1, 4),
    createdBy: 'Spotify'
  },
  {
    id: '4',
    name: 'Chill Hits',
    description: 'Kick back to the best new and recent chill hits.',
    coverImage: 'https://picsum.photos/300/300?random=13',
    tracks: mockTracks.slice(2, 5),
    createdBy: 'Spotify'
  },
  {
    id: '5',
    name: 'Pop Rising',
    description: 'The biggest pop songs and the best new pop music.',
    coverImage: 'https://picsum.photos/300/300?random=14',
    tracks: mockTracks.slice(0, 4),
    createdBy: 'Spotify'
  }
] 