import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterCreated, ordenByName } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from "./Paginado";
import  NavBar from './NavBar';
import SearchBar from './SearchBar';



export default function Home () {
  

    const dispatch = useDispatch()
    const allVideogames = useSelector ( (state) => state.videogames)
    const [orden, setOrden]= useState('')
   
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamerPerPage] = useState(15);
    const indexOfLastPokemon = currentPage * videogamerPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - videogamerPerPage;
    const currentVideogames = allVideogames.slice(
      indexOfFirstPokemon,
      indexOfLastPokemon
    )

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
      }; 

    const genres = useSelector((store) => store.genres);

     // Filtrado por genre
  const handleFilter = (e) => {
    dispatch(handleAsDesc(e.target.value))
    paginado(e, 1);
  };

  

    useEffect (() =>{
        dispatch(getVideogames())
    },[dispatch])


    function handleFilterCreated(e) {
      e.preventDefault();
       dispatch( filterCreated(e.target.value))
       setCurrentPage(1)
       setOrden(`Ordenado ${e.target.value}`)
  }

  function handleAsDesc(e){
    e.preventDefault();
    dispatch(ordenByName(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }

 
    
  //Volver a cargar todos los personajes
   function handleClick(e){
      e.preventDefault();
      dispatch(getVideogames())
  }
  
  
  
  return (
    <>
      <NavBar />
      <SearchBar className="search"/>
      <button  onClick={e => handleClick(e)}>
        Volver a cargar 
      </button>
      <div className="home">
        <div>
          <select  onChange={e => handleAsDesc(e)}>
            <option value="asc">Alfabético A - Z</option>
              <option value="desc">Alfabético Z - A</option>
              <option value="asc_rating">Clasificación de (May - Men)</option>
              <option value="desc_rating">Clasificación de (- a +)</option>
          </select>
      {/*     <select  >
            <option value="All"> Orden de  </option>
            <option value="min">Menor a Mayor</option>
            <option value="max">Mayor a Menor</option>
          </select> */}
        {/*   <select >
            <option value="type"> Tipo </option>
            <option value="normal"> Normal </option>
            <option value="flying"> Flying </option>
            <option value="poison"> Poison </option>
            <option value="ground"> Ground </option>
            <option value="bug"> Bug </option>
            <option value="fire"> Fire </option>
            <option value="water"> Water </option>
            <option value="grass"> Grass </option>
            <option value="electric"> Electric </option>
            <option value="fairy"> Fairy </option>
          </select> */}
          <select>
          <option value="">Genero</option>
          <select onChange={(e) => handleFilter(e)}></select>
          <option default>All</option>
          {genres.map((G) => (
            <option key={G.id} value={G.name}>{G.name}</option>
          ))}
          </select>
          <select onChange={e => handleFilterCreated(e)}>
          <option value="Todos"> Todos </option>
            <option value="Creados"> Creados </option>
            <option value="Existente"> Existente </option>
          </select>


          <Paginado
            pokemonsPerPage={videogamerPerPage}
            allPokemons={allVideogames.length}
            paginado={paginado}
          />
           { currentVideogames?.map((e, index) => {
              return (
                 <div >
                
                  <Link to={"/home/" + e.id}>
                    <Card key={e.id}
                      name={e.name}
                      background_image={e.background_image}
                      genres={e.genres}
                      
                    />
                  </Link>
                </div> 
              );
            })}  
        </div>
      </div>
    </>
  );
    

}