import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const Header = () => {
  return (
    <header className="app-bar">
      <div className="toolbar" style={{margin: '0'}}>
        <a href="/" className="logo-title">
          <img src={logo} alt="In the Loop Logo" className="logo-image" />
          <span className="title-text">In The Loop</span>
        </a>
    
      </div>
    {/* <nav>
        <Link to="/posts">Discussions</Link>
    
        <Link to="/login">Login</Link>
      </nav> */}
    </header>
  );
};

export default Header;
