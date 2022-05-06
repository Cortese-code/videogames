/* import React from 'react';
import './Card.css'


export default function Card({name, background_image, genres }){
    return (
        <div className="card">
        <div >
            <div className='nameGenres'>
                <div className="name">{name}</div>
            </div>
            <div>
                <img className="img" src={background_image} alt = 'flag'/>
            </div>
            <div>
                <div className="genres">{genres}</div>
            </div>
        </div>
        </div>
    )
}  */

import React from "react";
import "./Card.css";


export default function Card({ name, background_image, genres}) {
  return (
    <div className="stylesCard">
      <h3 className="name"> {name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <img src={background_image} alt="imagen" className="img" width="270px" height="120px"/>

         <h3 className="typeStyle">Genero:{genres}</h3>

    </div>
  );
}
