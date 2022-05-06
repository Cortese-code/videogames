import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBa } from "../actions";
import "./SearchBar.css";

export default function SearchBar({onSearch}) {
  const dispatch = useDispatch();
  const [name, setName] = useState('')

  const handleImputChange = (e) =>{
    setName(e.target.value)
    console.log(name)
  }
   const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchBa(name))
    setName('')
  }  

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSearch(name);
      setName('');
    }}>
      <input
        className="search"
        type="text"
        placeholder="Buscar Videogames..."
        onChange={(e) => handleImputChange(e)}
        value={name}
      />
       <input  className ="boton" type="submit" value="Buscar"onClick= {(e) => handleSubmit(e)}  /> 
    </form>
  );
}