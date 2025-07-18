import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function NavBar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">🎬 MovieHub</Link>
        </div>
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/favorite" className={`nav-link ${location.pathname === '/favorite' ? 'active' : ''}`}>Favorites</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
