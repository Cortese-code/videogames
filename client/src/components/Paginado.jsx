import React from "react";
import "./Paginado.css"

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    
      <div >
        {pageNumbers &&
          pageNumbers.map(number => {
             return <li className="number" key ={number}>
           <button className="btn" onClick={() => paginado(number)}>
             {number}
              </button>
            </li>
          })}
      </div>
  
  );
} 
 