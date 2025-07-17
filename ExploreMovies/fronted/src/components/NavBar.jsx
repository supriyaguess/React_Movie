import { Link } from 'react-router-dom';
import '../css/Navbar.css'; //  you have a CSS file for styling

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className='navbar-links'>
        <Link to="/" className='nav-link'>Home</Link>
        <Link to="/favorite" className='nav-link'>Favorites</Link>

      </div>
    </nav>
  );
}

export default NavBar;