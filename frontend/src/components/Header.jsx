import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
        const response = await fetch(`http://localhost:5176/api/user/logout`, {
            method: "POST",
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Logout successfully");
        navigate("/user/login");
    } catch (error) {
        console.error("Error Logout:", error);
    }
}
  return (
    <header className="app-bar">
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div className="toolbar">
        <a href="/" className="logo-title">
          <img src={logo} alt="In the Loop Logo" className="logo-image" />
          <span className="title-text">In The Loop</span>
        </a>
      </div>
      <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
                <button style={{ backgroundColor: '#e53e3e', borderRadius: '10%', color: 'white' }} onClick={handleLogout}>Logout</button>
            </div>
      </div>
      
    {/* <nav>
        <Link to="/posts">Discussions</Link>
    
        <Link to="/login">Login</Link>
      </nav> */}
    </header>
  );
};

export default Header;
