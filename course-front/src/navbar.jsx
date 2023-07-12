import { Link } from "react-router-dom"
function Navbar(){
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-center">
        <Link to="/" className="navbar-brand">Course App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/add" className="nav-link">Signup</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Signin</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
        </>
    )
}

export default Navbar;