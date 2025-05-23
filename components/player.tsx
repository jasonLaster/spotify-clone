'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2, 
  VolumeX,
  Heart,
  PictureInPicture,
  Maximize2
} from 'lucide-react'
import * as Slider from '@radix-ui/react-slider'
import { usePlayerStore } from '@/lib/store'
import { formatTime } from '@/lib/utils'

export function Player() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    volume,
    shuffle,
    repeat,
    setIsPlaying,
    setCurrentTime,
    setVolume,
    nextTrack,
    previousTrack,
    toggleShuffle,
    toggleRepeat
  } = usePlayerStore()

  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioUrl
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentTrack, isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleSeek = (values: number[]) => {
    const newTime = values[0]
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (values: number[]) => {
    const newVolume = values[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  if (!currentTrack) {
    return null
  }

  return (
    <div className="bg-spotify-gray border-t border-gray-800 px-4 py-3">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = currentTime
          }
        }}
      />
      
      <div className="flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center space-x-4 min-w-0 w-[350px]">
          <div className="relative w-14 h-14 bg-gray-800 rounded overflow-hidden flex-shrink-0">
            <Image
              src={currentTrack.albumArt}
              alt={currentTrack.album}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-white text-sm font-medium truncate">
              {currentTrack.title}
            </h4>
            <p className="text-gray-400 text-xs truncate">
              {currentTrack.artist}
            </p>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <PictureInPicture className="w-4 h-4" />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-[722px]">
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleShuffle}
              className={`transition-colors ${
                shuffle ? 'text-spotify-green' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </button>
            
            <button
              onClick={previousTrack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button
              onClick={togglePlayPause}
              className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </button>
            
            <button
              onClick={nextTrack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            
            <button
              onClick={toggleRepeat}
              className={`transition-colors ${
                repeat !== 'off' ? 'text-spotify-green' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[currentTime]}
              max={currentTrack.duration}
              step={1}
              onValueChange={handleSeek}
            >
              <Slider.Track className="bg-gray-600 relative grow rounded-full h-1">
                <Slider.Range className="absolute bg-white rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-3 h-3 bg-white rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white" />
            </Slider.Root>
            <span className="text-xs text-gray-400 w-10">
              {formatTime(currentTrack.duration)}
            </span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center space-x-3 w-[350px] justify-end">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
          
          <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          
          <Slider.Root
            className="relative flex items-center select-none touch-none w-24 h-5"
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
          >
            <Slider.Track className="bg-gray-600 relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-white rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-3 h-3 bg-white rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white" />
          </Slider.Root>
        </div>
      </div>
    </div>
  )
} 