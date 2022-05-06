import axios from "axios";
import { GET_VIDEOGAMES,
  SEARCH_NAME,
  GET_DETAILS,
  GET_GENRES,
  FILTER_CREATED,
} from "./constantes";

export function getVideogames  ()  {
    return async function (dispatch)  {
      let pedidoApi = await axios.get('http://localhost:3001/videogames')
         return dispatch({
               type: GET_VIDEOGAMES, 
               payload: pedidoApi.data 
            });
        };
    };

 /*    export function getVideogames() {
      return function (dispatch) {
        return fetch(`http://localhost:3001/videogames`)
          .then(response => response.json())
          .then(json => {
            dispatch({ type: "GET_VIDEOGAMES", payload: json });
          });
      };
    } */

/*   export function getPokemons() {
    return async function (dispatch) {
      var json = await axios.get("http://localhost:3001/pokemons");
      return dispatch({
        type: "GET_POKEMONS",
        payload: json.data,
      });
    };
  }
    */

  
export function searchBa(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get('http://localhost:3001/videogames?name=' + name) 
      return dispatch({
        type: SEARCH_NAME,
        payload: json.data,
      });
    } catch {
      return alert("No se encontró el Videogamer");
    }
  };
}


//* Trae los detalles del juego por pasado por (params :ID)

 export function getDetail(id) {
  return async function (dispatch) {
    try{
        var json = await axios.get(`http://localhost:3001/videogames/${id}`);
    return dispatch({
      type: GET_DETAILS,
      payload: json.data
    })
   
} catch(error) {
  console.log(error)
}
  }
} 


export function getGenres() {
  return async function (dispatch) {
    try {
      var json = await axios.get('http://localhost:3001/genres') 
      return dispatch({
        type: GET_GENRES,
        payload: json.data,
      });
    } catch {
      return  alert("No se encontró el Genero");
    }
  };
};

export function createVideogame(payload) {
  return async function () {
  try{
    const response = await axios.post('http://localhost:3001/videogames', payload)
    // console.log(response)
      return response
  }catch (err) {
    console.error(err)
  }
  }
}



export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload
  };
};


export function ordenByName(payload) {
  return {
    type: 'ORDEN_BY_NAME',
    payload
  }
}