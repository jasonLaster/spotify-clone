# Spotify Clone

A modern, fully-functional Spotify clone built with Next.js 15, TypeScript, and Tailwind CSS. This application replicates the core Spotify experience with a beautiful dark theme, music player functionality, and responsive design.

## ✨ Features

### 🎵 Music Player

- **Full Audio Controls**: Play, pause, skip forward/backward
- **Progress Bar**: Seek to any position in the track
- **Volume Control**: Adjustable volume with mute functionality
- **Shuffle & Repeat**: Toggle shuffle mode and repeat options (off/track/playlist)
- **Queue Management**: Automatic queue handling with track progression

### 🎨 User Interface

- **Spotify-Authentic Design**: Dark theme matching Spotify's visual identity
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Custom Scrollbars**: Styled scrollbars matching the dark theme

### 📱 Components

- **Sidebar Navigation**: Home, Search, Library, and playlist navigation
- **Top Navigation**: Back/forward buttons, search bar, and user profile
- **Playlist Cards**: Interactive cards with hover play buttons
- **Track Lists**: Detailed track information with play-on-click functionality
- **Audio Player**: Full-featured bottom player with all controls

### 🎧 Content

- **Mock Playlists**: Pre-loaded with popular playlists and tracks
- **Album Artwork**: High-quality cover images for visual appeal
- **Track Information**: Artist, album, and duration details
- **Recently Played**: Track history and recommendations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd spotify-clone
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **UI Components**: Radix UI (Slider, Dropdown Menu, Tooltip)
- **Utilities**: clsx for conditional classes

## 📁 Project Structure

```
spotify-clone/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with sidebar and player
│   └── page.tsx             # Home page with playlists and tracks
├── components/
│   ├── sidebar.tsx          # Left navigation sidebar
│   ├── top-nav.tsx          # Top navigation bar
│   ├── player.tsx           # Bottom music player
│   └── playlist-card.tsx    # Playlist card component
├── lib/
│   ├── store.ts             # Zustand store for player state
│   └── utils.ts             # Utility functions
└── tailwind.config.ts       # Tailwind configuration
```

## 🎮 How to Use

### Playing Music

1. **Browse Playlists**: Scroll through the "Made for you" section
2. **Quick Play**: Click on any playlist card to start playing
3. **Track Selection**: Click on individual tracks in the "Recently played" section
4. **Player Controls**: Use the bottom player for full control

### Navigation

- **Sidebar**: Navigate between Home, Search, and Library
- **Search**: Use the top search bar to find content
- **Playlists**: Access your playlists from the sidebar

### Player Features

- **Play/Pause**: Click the center play button
- **Skip Tracks**: Use forward/backward buttons
- **Seek**: Click anywhere on the progress bar
- **Volume**: Adjust using the volume slider
- **Shuffle**: Toggle random track order
- **Repeat**: Cycle through off/playlist/track repeat modes

## 🎨 Customization

### Colors

The app uses a custom color palette defined in `tailwind.config.ts`:

- **Spotify Green**: `#1db954`
- **Background**: Dark grays and blacks
- **Accents**: Various gray shades for hierarchy

### Adding Content

To add your own playlists and tracks, modify the mock data in `lib/store.ts`:

```typescript
export const mockTracks: Track[] = [
  {
    id: "unique-id",
    title: "Song Title",
    artist: "Artist Name",
    album: "Album Name",
    duration: 180, // in seconds
    albumArt: "https://image-url.jpg",
    audioUrl: "https://audio-file-url.mp3",
  },
];
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Features to Extend

- **Real Audio Integration**: Connect to Spotify Web API or other music services
- **User Authentication**: Add login/logout functionality
- **Playlist Management**: Create, edit, and delete playlists
- **Search Functionality**: Implement real search with results
- **Social Features**: Follow artists, share playlists

## 📱 Responsive Design

The application is fully responsive with breakpoints for:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance

- **Optimized Images**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic code splitting with Next.js
- **CSS Optimization**: Tailwind CSS purging for minimal bundle size
- **State Management**: Efficient Zustand store with minimal re-renders

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes. Spotify is a trademark of Spotify AB.

## 🙏 Acknowledgments

- **Spotify** for the design inspiration
- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Radix UI** for accessible component primitives
