import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import NavBar from './components/NavBar';
import { MovieProvider } from './contexts/MovieContext';
import Favorite from './components/pages/Favorite';
import MovieDetail from './components/MovieDetail';
function App() {
  return (
      <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/movie/:id" element={<MovieDetail />} /> {/* ✅ */}
        </Routes>
      </main>
      </MovieProvider>

  );
}

export default App;
