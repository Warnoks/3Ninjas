import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Info, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  Search, 
  Bell, 
  Star, 
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

const TMDB_API_KEY = '696c35bd3a294cad05d7c5a927001c2a';
const TMDB_BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTZjMzViZDNhMjk0Y2FkMDVkN2M1YTkyNzAwMWMyYSIsIm5iZiI6MTc5NDEzNTg2Mi4xMDYsInN1YiI6IjZhZjA1NzM2ZGMwMDhlMWI4NWFkODJjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.78MH1baVMI-YwcuitpvgWcrfY3KspGMvPgVZVbGWS3o';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

// --- COMPONENTS ---

const PlayerView = ({ movie, onBack }) => {
  const [useFallback, setUseFallback] = useState(false);

  const getEmbedUrl = () => {
    if (!movie) return '';
    if (movie.type === 'tv') {
      const baseUrl = `https://video.moviepire.co/embed/tv/${movie.tmdbId}/${movie.season || 1}/${movie.episode || 1}`;
      return movie.isAnime ? `${baseUrl}?audio=dub` : baseUrl;
    }
    return `https://video.moviepire.co/embed/movie/${movie.tmdbId}`;
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col">
      <div className="absolute top-0 left-0 w-full p-6 z-10 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors font-medium bg-black/40 px-4 py-2 rounded-md backdrop-blur-md"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Browse
        </button>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setUseFallback(!useFallback)}
            className="text-xs sm:text-sm bg-cyan-600/80 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5"
          >
            <AlertCircle size={14} />
            {useFallback ? "Switch to Embed Player" : "Switch to Direct Stream Player"}
          </button>
          <h3 className="text-white font-bold hidden sm:block">{movie?.title}</h3>
        </div>
      </div>
      
      <div className="flex-1 w-full h-full flex items-center justify-center relative pt-16 sm:p-12 p-4">
        <div className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative" style={{ aspectRatio: '16/9' }}>
          {useFallback ? (
            <video 
              controls 
              autoPlay 
              className="w-full h-full object-cover"
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              src={getEmbedUrl()}
              style={{ width: '100%', height: '100%', aspectRatio: '16/9', border: '0' }}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              title={movie?.title || "Stream"}
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'user@3ninjas.com' && password === 'password123') {
      onLogin();
    } else {
      setError('Invalid email or password. Use user@3ninjas.com / password123');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-rose-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-slate-800 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 mb-2 tracking-tight">
            Salsalin Movies
          </h1>
          <p className="text-slate-400">Sign in to start watching</p>
        </div>

        {error && (
          <div className="bg-rose-950/50 border border-rose-900 text-rose-300 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="user@3ninjas.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-cyan-900/30"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Demo Credentials:</p>
          <p>Email: <span className="text-slate-300">user@3ninjas.com</span></p>
          <p>Password: <span className="text-slate-300">password123</span></p>
        </div>
      </div>
    </div>
  );
};

const MovieModal = ({ movie, onClose, onPlay }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-slate-950/50 hover:bg-slate-800 text-white rounded-full p-2 backdrop-blur-md transition-colors"
        >
          <X size={20} />
        </button>

        <div className="relative h-64 sm:h-96 w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-0" />
          <img 
            src={movie.backdrop || movie.poster} 
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 z-10 w-full">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-2">{movie.title}</h2>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
              <span className="text-emerald-400">{movie.match}</span>
              <span className="text-slate-300">{movie.year}</span>
              <span className="flex items-center text-amber-400">
                <Star size={14} className="mr-1 fill-current" /> {movie.rating}
              </span>
              <span className="px-2 py-0.5 border border-slate-600 rounded text-slate-300 text-xs">HD</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="flex gap-4">
              <button 
                onClick={() => onPlay(movie)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white hover:bg-slate-200 text-slate-900 px-8 py-3 rounded-lg font-bold transition-colors"
              >
                <Play size={20} className="fill-current" />
                Play Now
              </button>
            </div>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {movie.overview}
            </p>
          </div>
          <div className="md:w-64 space-y-4 text-sm">
            <div>
              <span className="text-slate-500 block mb-1">Type</span>
              <span className="text-slate-300 capitalize">{movie.type}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">TMDB ID</span>
              <span className="text-slate-300">{movie.tmdbId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MovieRow = ({ title, movies, onMovieClick }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      rowRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="mb-10 relative group">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 px-4 sm:px-8 md:px-12">{title}</h2>
      
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-40 w-12 sm:w-16 bg-gradient-to-r from-slate-950 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-cyan-400 text-white"
        >
          <ChevronLeft size={36} />
        </button>

        <div 
          ref={rowRef}
          className="flex overflow-x-auto gap-4 px-4 sm:px-8 md:px-12 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="flex-none w-36 sm:w-48 md:w-56 aspect-[2/3] relative rounded-lg overflow-hidden snap-start cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30 hover:ring-2 hover:ring-cyan-500 bg-slate-900"
              onClick={() => onMovieClick(movie)}
            >
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h4 className="text-white font-semibold text-sm truncate">{movie.title}</h4>
                <div className="flex items-center text-amber-400 text-xs mt-1">
                  <Star size={10} className="mr-1 fill-current" /> {movie.rating}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-40 w-12 sm:w-16 bg-gradient-to-l from-slate-950 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-cyan-400 text-white"
        >
          <ChevronRight size={36} />
        </button>
      </div>
    </div>
  );
};

const Dashboard = ({ onLogout }) => {
  const [heroMovie, setHeroMovie] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [playingMovie, setPlayingMovie] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchTMDBData = async () => {
      try {
        const headers = {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_BEARER_TOKEN}`
        };

        const [trendingRes, actionRes, tvRes, animeRes] = await Promise.all([
          fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`, { headers }),
          fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=28`, { headers }),
          fetch(`${TMDB_BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}`, { headers }),
          fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=16&with_original_language=ja`, { headers })
        ]);

        const trendingData = await trendingRes.json();
        const actionData = await actionRes.json();
        const tvData = await tvRes.json();
        const animeData = await animeRes.json();

        const formatMovies = (results, type = 'movie') => {
          return (results || []).map(item => ({
            id: item.id,
            tmdbId: item.id,
            type: type,
            season: 1,
            episode: 1,
            isAnime: type === 'tv' || item.original_language === 'ja',
            title: item.title || item.name,
            poster: item.poster_path ? `${TMDB_IMAGE_BASE}${item.poster_path}` : 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600',
            backdrop: item.backdrop_path ? `${TMDB_IMAGE_BASE}${item.backdrop_path}` : 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1920',
            overview: item.overview || 'No overview available.',
            year: (item.release_date || item.first_air_date || '2026').substring(0, 4),
            rating: item.vote_average ? item.vote_average.toFixed(1) : '4.5',
            match: `${Math.floor(85 + (item.vote_average || 7) * 1.5)}% Match`
          }));
        };

        const trendingList = formatMovies(trendingData.results || []);
        const actionList = formatMovies(actionData.results || []);
        const tvList = formatMovies(tvData.results || [], 'tv');
        const animeList = formatMovies(animeData.results || []);

        if (trendingList.length > 0) {
          setHeroMovie(trendingList[0]);
        }

        setCategories([
          { title: "Trending Now", movies: trendingList },
          { title: "Action & Thrillers", movies: actionList },
          { title: "Popular TV Shows", movies: tvList },
          { title: "Anime & Animation", movies: animeList }
        ]);
      } catch (err) {
        console.error("Failed to fetch TMDb data", err);
      }
    };

    fetchTMDBData();
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`
      };
      const res = await fetch(`${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`, { headers });
      const data = await res.json();
      const results = (data.results || []).filter(item => item.poster_path).map(item => ({
        id: item.id,
        tmdbId: item.id,
        type: item.media_type === 'tv' ? 'tv' : 'movie',
        season: 1,
        episode: 1,
        title: item.title || item.name,
        poster: `${TMDB_IMAGE_BASE}${item.poster_path}`,
        backdrop: item.backdrop_path ? `${TMDB_IMAGE_BASE}${item.backdrop_path}` : `${TMDB_IMAGE_BASE}${item.poster_path}`,
        overview: item.overview || 'No overview available.',
        year: (item.release_date || item.first_air_date || '2026').substring(0, 4),
        rating: item.vote_average ? item.vote_average.toFixed(1) : '4.5',
        match: '95% Match'
      }));
      setSearchResults(results);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  if (playingMovie) {
    return <PlayerView movie={playingMovie} onBack={() => setPlayingMovie(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-lg shadow-slate-900/50 py-4' : 'bg-gradient-to-b from-slate-950/80 to-transparent py-6'}`}>
        <div className="px-4 sm:px-8 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-8 md:gap-12">
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 tracking-tight cursor-pointer">
              Salsalin Movies
            </h1>
            <div className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
              <a href="#" className="text-white hover:text-cyan-400 transition-colors">Home</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">TV Shows</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Movies</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">New & Popular</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">My List</a>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-slate-300">
            <div className="relative hidden sm:block">
              <input 
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearch}
                className="bg-slate-900/80 border border-slate-700 rounded-full px-4 py-1.5 pl-10 text-sm text-white focus:outline-none focus:border-cyan-500 w-48 focus:w-64 transition-all"
              />
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            </div>
            <Bell className="w-5 h-5 cursor-pointer hover:text-cyan-400 transition-colors hidden sm:block" />
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 text-sm font-medium hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      {heroMovie && !isSearching && (
        <div className="relative w-full h-[70vh] sm:h-[85vh] flex flex-col justify-center px-4 sm:px-8 md:px-12 mb-12">
          <div className="absolute inset-0 z-0">
            <img 
              src={heroMovie.backdrop} 
              alt="Hero Backdrop" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-2xl mt-20">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg leading-tight">
              {heroMovie.title}
            </h2>
            <div className="flex items-center gap-4 text-sm font-semibold mb-6">
              <span className="text-emerald-400">{heroMovie.match}</span>
              <span>{heroMovie.year}</span>
              <span className="px-2 py-0.5 border border-slate-600 rounded text-slate-300 text-xs">HD</span>
            </div>
            <p className="text-slate-300 text-base sm:text-lg mb-8 line-clamp-3 md:line-clamp-none max-w-xl text-shadow-sm">
              {heroMovie.overview}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setPlayingMovie(heroMovie)}
                className="flex items-center gap-2 bg-white hover:bg-slate-200 text-slate-900 px-6 sm:px-8 py-3 rounded-lg font-bold transition-colors"
              >
                <Play size={20} className="fill-current" />
                Play
              </button>
              <button 
                onClick={() => setSelectedMovie(heroMovie)}
                className="flex items-center gap-2 bg-slate-500/40 hover:bg-slate-500/60 text-white backdrop-blur-sm px-6 sm:px-8 py-3 rounded-lg font-bold transition-colors"
              >
                <Info size={20} />
                More Info
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`pb-20 relative z-10 ${heroMovie && !isSearching ? 'mt-[-10vh]' : 'mt-28'}`}>
        {isSearching ? (
          <div className="px-4 sm:px-8 md:px-12">
            <h2 className="text-2xl font-bold text-white mb-6">Search Results for "{searchQuery}"</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {searchResults.map((movie) => (
                <div 
                  key={movie.id} 
                  className="aspect-[2/3] relative rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:ring-2 hover:ring-cyan-500 bg-slate-900"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          categories.map((category, index) => (
            <MovieRow 
              key={index} 
              title={category.title} 
              movies={category.movies} 
              onMovieClick={setSelectedMovie}
            />
          ))
        )}
      </div>

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
          onPlay={(movie) => {
            setSelectedMovie(null);
            setPlayingMovie(movie);
          }}
        />
      )}
    </div>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('3ninjas_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('3ninjas_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('3ninjas_auth');
    setIsAuthenticated(false);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </>
  );
}
