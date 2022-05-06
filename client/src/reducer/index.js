import { GET_VIDEOGAMES} from '../actions/constantes';

const initialState = {
    videogames: [],
    copiaVideogames: [],
    genres: [],
    detail: [],
    filtervideogames: [],

}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                filtervideogames: action.payload
            }
            case 'SEARCH_NAME':
                return {
                    ...state,
                    videogames: action.payload
                }
                case 'GET_GENRES':
                    return {
                        ...state,
                        genres: action.payload
                    }
                    case 'CREATE_VIDEOGAMES':
                        return {
                            ...state,
                            createVideoGames: action.payload
                            
                        }
                    case 'GET_DETAILS':
                        return {
                          ...state,
                          detail: action.payload,
                        }
                        case 'FILTER_CREATED':
                            const createdFilter = action.payload === 'Creados' ? state.filtervideogames.filter(el => el.create) : state.filtervideogames.filter(el => !el.create) 
                            return {
                                ...state,
                                videogames: action.payload === "Todos" ? state.filtervideogames : createdFilter
                  
                            }
                            case 'ORDEN_BY_NAME':
                                const orden = action.payload === "asc" ?
                                state.videogames.sort(function(a, b){
                                    if(a.name > b.name){
                                        return 1;
                                    }
                                    if(b.name > a.name){
                                        return -1;
                                    }
                                    return 0;
                                }) :
                                state.videogames.sort(function( a, b){
                                    if(a.name > b.name){
                                      return -1;
                                    }
                                    if(b.name > a.name){
                                      return 1;
                                    }
                                    return 0;
                                   });
                                   return {
                                     ...state,
                                     videogames:orden
                                   }
                                    

                                
            default:
                return state;
    }

}
export default rootReducer;