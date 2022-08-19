import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
      </ul>
    </>
  );
}

export default Navbar;
