/* import React from 'react';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createVideogame, getGenres } from "../actions/index";
import "./Create.css";

export default function Create() {
    const dispatch = useDispatch();
    const genres = useSelector((store) => store.genres);
    const genres1 = genres.slice(0, 10)
    const genres2 = genres.slice(10, 20)

    const [game, setGame] = useState({
        name: "",
        description: "",
        image: "",
        released: "",
        rating: 0,
        genres: [],
        platforms: [],
    });

    useEffect(() => {
        dispatch(getGenres());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const randomPlatforms = ["PC", "iOS", "Android", "macOS",  "PlayStation 4", "PlayStation 5", "Xbox", "PS Vita"]

    const ChangeInput = (e) => {
        if (e.target.name === "genres" || e.target.name === "platforms") {
        const arr = game[e.target.name];
        setGame({
            ...game,
            [e.target.name]: arr.concat(e.target.value),
        });
    } else {
        setGame({
            ...game,
            [e.target.name]: e.target.value,
        });
    }
    };

    

    const handleSubmit = (e) => {
        e.preventDefault();

        const obj = {
        name: game.name,
        description: game.description,
        image: game.image,
        released: game.released,
        rating: game.rating,
        genres: game.genres,
        platforms: game.platforms,
        };

        // Validaciones
        if (!obj.name) {
            alert("Hey! Don't forget the name.")
            return
        }
        if (!obj.description) {
            alert("Hey! Don't forget the description.")
            return
        }if (!obj.released) {
            alert("Hey! Don't forget the date.")
            return
        }if (obj.rating > 5 || obj.rating < 0) {
            alert("Hey! The rating should be between 0 and 5.")
            return
        }


        dispatch(createVideogame(obj));
        e.target.reset();
        alert("Videogame created successfully!");
        /* dispatch(getVideogames()) */

      /*  setGame({
            name: "",
            description: "",
            image: "",
            released: "",
            rating: 0,
            genres: [],
            platforms: [],
        });
    };

return (
    <div className="container">
        <h1>Crea tu propio  Videogame!</h1>
        <form
            id="survey-form"
            className="form"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={(e) => handleSubmit(e)}
        >
            <div>
            <div>
                <div className="divTitles">
                    <div>
                        <label>-Name-</label>
                        <input
                        className="label"
                        type="text"
                        name="name"
                        value={game.name}
                        ></input>
                    </div>
                    <div>
                        <label>-Description-</label>
                        <input
                        className="label"
                        type="text"
                        name="description"
                        value={game.description}
                        ></input>
                    </div>
                    <div>
                        <label>-Released-</label>
                        <input
                        className="label"
                        type="date"
                        name="released"
                        value={game.released}
                        ></input>
                    </div>
                    <div>
                        <label>-Rating-</label>
                        <input
                        className="label"
                        type="number"
                        name="rating"
                        value={game.rating}
                        ></input>
                    </div>
                </div>
                <div className="imagediv">
                    <label>-Image URL-</label>
                    <input
                    className="imagein"
                    type="text"
                    name="image"
                    value={game.image}
                    ></input>
                </div>
            </div>
                <div className="checkboxs">
                    <div className="checks">
                        <label>-Genres-</label>
                        <div className="gendivs">
                            <div>
                                {genres1.map((gen) => (
                                <div key={gen.name}>
                                    <input
                                    type="checkbox"
                                    name="genres"
                                    value={gen.name}
                                    ></input>
                                    <label name={gen}>{gen.name}</label>
                                </div>
                                ))}
                            </div>
                            <div>
                                {genres2.map((gen) => (
                                <div key={gen.name}>
                                    <input
                                    type="checkbox"
                                    name="genres"
                                    value={gen.name}
                                    ></input>
                                    <label name={gen}>{gen.name}</label>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="checks">
                        <label>-Platforms-</label>
                        <div >
                            {randomPlatforms.map((P) => (
                            <div key={P}>
                                <input
                                type="checkbox"
                                name="platforms"
                                value={P}
                                ></input>
                                <label name={P}>{P}</label>
                            </div>
                            ))}
                        </div>
                    </div>
                    
                </div>
                <Link to="/home">
      <button type="submit" className="atras">Regresar</button></Link>
      <button type="submit"  className="bottom">Crear</button>
            </div>
        </form>
    </div>
);
}
 */
 

import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom"
import { createVideogame, getGenres } from "../actions/index";
import { Link } from "react-router-dom";
import "./Create.css";

/* 
  let noEmpty = /\S+/;
  let validateName = /^[a-z]+$/i;
  let validateNum = /^\d+$/;
  let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;
  */
  const validate = (input) => {
    let errors = {};
  /*    if (
      !noEmpty.test(input.name) ||
      !validateName.test(input.name) ||
      input.name.length < 3
    ) {
      errors.name =
        "Nombre debe contener: solo cadena de más de dos caracteres y sin números";
    }
    if (!validate.description.test(input.description)) {
      errors.description = "Mal";
    }
    if (!validate.released.test(input.released)) {
        errors.released = "Mal"
    }
    if (!validateNum.test(input.rating) || parseInt(input.rating) < 1) {
      errors.rating = "Numero requerido: mayor a uno";
    }
    if (!validateUrl.test(input.background_image)) {
      errors.image = "Imagen Inválido URL requerida";
    }  */

    return errors;
  };
 



export default function Create() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  ///const platforms = useSelector((state) => state.platforms);

   const [errors,setErrors] = useState({});  

  const [videogame, setVideogame] = useState({
    name: '',
    description: '',
    released: '',
    rating: '',
    background_image: '',
    genres: [],
    platforms: [],
});




   useEffect(() => {
    dispatch (getGenres());
  }, [dispatch]); 

   function handleSelect(e) {
    setVideogame({
      ...videogame,
      genres: [...videogame.genres, e.target.value]
     //genres: Array.from(new Set([...videogame.genres, e.target.value]))
    });
    console.log(videogame)
  } 

/*   function handlePlatforms(e) {
    setVideogame({
      ...videogame,
     // genres: [...videogame.genres, e.target.value]
     platforms: Array.from(new Set([...videogame.platforms, e.target.value]))
    });
    console.log(videogame)
  } 
  */




function handleChange(e) {
  //console.log(e.target.value)
  setVideogame({
    ...videogame,
    [e.target.name]: e.target.value,
    [e.target.description]: e.target.value,
    [e.target.released]: e.target.value,
    [e.target.rating]: e.target.value,
    [e.target.genres]: e.target.value,
    [e.target.platforms]: e.target.value,
    [e.target.background_image]: e.target.value,
  });
 


    setErrors(
    validate({
      ...videogame,
      [e.target.name]: e.target.value,
      [e.target.description]: e.target.value,
      [e.target.released]: e.target.value,
      [e.target.rating]: e.target.value,
      [e.target.genres]: e.target.value,
      [e.target.platforms]: e.target.value,
      [e.target.background_image]: e.target.value,

    })
  ); 
} 


function handleSubmit(e) {
  e.preventDefault();
  
 /*    if(errors.description || errors.released || errors.rating || errors.genres || errors.platforms) return alert('Datos incorrectos');  */


  dispatch(createVideogame(videogame)); 
  alert("Videogamer creado con exito"); 

  setVideogame({
    name: '',
    description: '',
    released: '',
    rating: '',
    background_image: "",
    genres: [],
    platforms: [],
  });
 // history.push("/home");
} 
 
 /* const [errorBoton, setErrorBoton] = useState(true);  */

     //borrar genres
    function handleDelete(e){
      console.log('click')
      setVideogame({
           ...videogame,
      genres : videogame.genres.filter(ty => ty !== e)
      })
      
    } 
  

  return (
    <div>
    <form  className="form"  onSubmit={(e) =>handleSubmit(e)}>
      <h3 className="title"> ¡Crea tu Videogamer!</h3>
      <label> Nombre: </label>
        <input
          onChange={handleChange}
          id="name"
          name="name"
          type="text"
          value={videogame.name}
          required
          className="input"
        />
      {/*    {errors.name && <p className="error"> {errors.name}</p>}  */}
      
    
        <label>Descripción: </label>
        <input
          onChange={e => handleChange(e)}
          id="description"
          name="description"
          type="text"
          value={videogame.description}
          required
          className="input"
        />{" "}
    {/*     {errors.life && <p className="error"> {errors.description}</p>}  */}
     
     
        <label>Publicado: </label>
        <input
          onChange={e => handleChange(e)}
          name=" released"
          type="date"
          value={videogame.released}
          className="input"
        />
       {/*   {errors.released && <p className="error"> {errors.released}</p>} */}
     
     
        <label>Clasificación: </label>
        <input
          onChange={e => handleChange(e)}
          name="rating"
          format="number"
          value={videogame.rating}
          className="input"
        />{" "}
       {/*  {errors.rating && <p className="error"> {errors.rating}</p>} */}
     
        <label>Imagen: </label>
        <input
          onChange={e => handleChange(e)}
          name="background_image"
          type="text"
          value={videogame.image}
          className="input"
        />{" "}
    {/*      {errors.image && <p className="error"> {errors.image}</p>} */}


         <label className="title-name"><strong>Plataforma: </strong> </label>
                        <div id='platforms' className="plat-div">
                            <div>
                                <input name='PC' type="checkbox" id="PC" />
                                <label>PC.</label>
                            </div>
                            <div>
                                <input name='iOS' type="checkbox" id="iOS" />
                                <label>iOS.</label>
                            </div>
                            <div>
                                <input name='Android' type="checkbox" id="Android" />
                                <label>Android.</label>
                            </div>
                            <div>
                                <input name='macOS' type="checkbox" id="macOS" />
                                <label>macOS.</label>
                            </div>
                            <div>
                                <input name='PlayStation 4' type="checkbox" id="PlayStation 4" />
                                <label>PlayStation 4.</label>
                            </div>
                            <div>
                                <input name='PlayStation 5' type="checkbox" id="PlayStation 5" />
                                <label>PlayStation 5.</label>
                            </div>
                            <div>
                                <input name='XBOX' type="checkbox" id="XBOX" />
                                <label >XBOX.</label>
                            </div>
                            <div>
                                <input name='PS Vita' type="checkbox" id="PS Vita" />
                                <label >PS Vita.</label>
                            </div>
                            </div>
       
      
        <p className="types-s">
        <select onChange={(e) =>handleSelect(e)}>
          {genres.map((e) => (
            <option key={e.id} value={e.name}>{e.name}</option>
          ))}
        </select> 
        </p> 

     {/*     <p>
        <select onChange={(e) =>handlePlatforms(e)}>
          {platforms.map((e) => (
            <option key={e.id} value={e.name}>{e.name}</option>
          ))}
        </select> 
        </p> 
 */}
        <Link to="/home">
      <button type="submit" className="atras">Regresar</button></Link>
      <button type="submit"  className="bottom">Crear</button>



    </form>
       {videogame.genres.map(e => 
          <div  className='temp' key={e.id}>
            <p>{e} </p>
            <button className='botonX'  onClick={() => handleDelete(e) }>x</button>
          </div>
          )} 
 
    </div>
     
  );
  
  
}
