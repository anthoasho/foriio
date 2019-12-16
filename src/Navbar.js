import React from "react";
import {Title} from "./Common";
import {Link, withRouter} from "react-router-dom";


function Navbar(){

return (
  <nav className="navbar">
    <Link to="/"><Title className="site-title">forriio</Title> </Link>
  </nav>

)

}


export default withRouter(Navbar)
