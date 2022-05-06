import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
      <header id="navegador" className="header">
        <Link to="/" className="logo">
              VideoGames
        </Link>
       <div> <Link to="/create" className="created" >
              Crear VideoGames
            </Link></div>
  
      </header>

  );
}