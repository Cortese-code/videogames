import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../actions/index";
//import NotFound from "../../components/NotFound/NotFound";
import "./Detail.css";

function Detail(props) {
  const dispatch = useDispatch();
  const  videogame = useSelector((state) => state.detail);
  
  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (    
    <div className="full">
      <div className="info">
          <div className="image">
              {/*    {videogame.image === null || !videogame.image  
              <NotFound image={"noimage"} />  */}
               <img src={videogame.background_image} alt={videogame.background_image} /> 
              <div>
                <h1>{videogame.name} </h1>
                <h3>Publicada: {videogame.released}</h3>
              </div>
        </div>  
        <div className="details">
          <div className="text">
            <h2>Descripción: </h2>
            <p>{videogame.description}</p>
          </div>
          <div className="Genres">
            <div className="genres">
            <h2>Genero: {videogame.genres}</h2>
            <h2> Clacificación: {videogame.rating}</h2>  
            </div>
          </div>
          <div className="Platforms">
            <div className="platforms">
              <h2>Plataforma: {videogame.platforms}.</h2>
            </div>
          </div>
        </div>
      </div>
      <Link to="/home">
          <button className="button" type="submit">Regresar</button>
      </Link>
    </div>    
  );
}

export default Detail; 

/* import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getVideogameById } from "../actions";
import { Link} from "react-router-dom";
import './Detail.css'

export default function Detail(props) {
  console.log(props)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch( getVideogameById(props.match.params.id));
  }, [dispatch,  props.match.params.id]);

  const newDetail = useSelector((state) => state.details);
console.log(newDetail);
  return (
    <div className="container">
      <div className="volver">
      <Link to="/home" className="letter"> Volver </Link> </div>
      <div>
        {newDetail.length>0 ? (
          newDetail.map((e) => (
            <Link to={"/home/" + e.id} key={e.id}>
              <div >
                <h1 className="names">{e.name.toUpperCase()}</h1>
                <h2 className="id">ID: {e.id}</h2>
              </div>
              <div>
                <img  className="imagen" src={e.background_image} alt="" width="250px" height="250px" />
                {e.types.length === 2 ? (
                  <div>
                    <h3 className="type1">
                    <ul className="type">
                      <li>
                        {
                        typeof e.types[0] === 'string' ? e.types[0] : e.types[0]?.name} 
                         {
                         typeof e.types[1] === 'string' ? e.types[1] : e.types[1]?.name}
                
                      </li>
                    </ul>
                    </h3>
                  </div>
                ) : (
                  <div>
                    <h3 className="type2">{
                    typeof e.types[0] === 'string' ? e.types[0] : e.types[0]?.name}</h3>
                  </div>
                )}

                <div>
                  <h4>
                  <ul>
                    <li className="lista">
                    description: {e.description}
                    platforms : {e.platforms} 
                    releaseDate: {e.releaseDate}
                    rating: {e.rating}
                  
                    
                    </li>
                  </ul>
                  </h4>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <img
            src={""}
            width="250px" height="300px"
            alt="No encontrado"
          />
        )}
      </div>
    </div>
  );
}
  */