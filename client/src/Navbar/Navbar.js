import { Link } from "react-router-dom";
import styles from "./styles.css";
function Navbar() {
  return (
    <nav className="nav-container">
      <div className="nav-link-wrapper">
        <Link to="/">
          <p>Home</p>
        </Link>

        <Link to="/posts">
          <p>Posts</p>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
