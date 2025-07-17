
import './css/App.css';
import Favorite from './components/pages/Favorite'
import Home from './components/pages/Home' 
import { Routes, Route } from 'react-router-dom';
import { MovieProvider } from './components/MovieContext';
import NavBar from './components/NavBar';
function App() {

  

  return (
       <MovieProvider>
      <NavBar />
   <main className="main-content">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorite />} />
    </Routes>

   </main>
   </MovieProvider>
  );
}

export default App
