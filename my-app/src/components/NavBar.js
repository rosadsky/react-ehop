import React from "react";
import { Link } from "react-router-dom";


function NavBar(){
    return (
      
        <ul>
            <li>
               <Link to="/"> Domov</Link>
            </li>
            <li>
               <Link to="/admin"> Admin</Link>
            </li>
            <li>
               <Link to="/objednavka"> Objednavka</Link>
            </li>
        </ul>
    )
}

export default NavBar;