import "./Navbar.css";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <div className="nav container-md d-flex justify-content-center m-3 ">
        <NavLink className="nav-link" to="/" end>
          Overview Page
        </NavLink>
        <NavLink className="nav-link" to="/Disclosures">
          Disclosure Page
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
