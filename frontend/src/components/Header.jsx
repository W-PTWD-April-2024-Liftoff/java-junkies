import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const Header = () => {
  return (
    <header className="app-bar">
      <div className="toolbar">
        <a href="/" className="logo-title">
          <img src={logo} alt="In the Loop Logo" className="logo-image" />
          <span className="title-text">In The Loop</span>
        </a>
    
      </div>
    <nav className="space-x-4 text-sm">
        <Link to="/posts">Discussions</Link>
    
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
