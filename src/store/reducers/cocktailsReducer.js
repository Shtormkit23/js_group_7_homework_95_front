import {
  FETCH_COCKTAILS_SUCCESS,
  FETCH_FAILURE, FETCH_USER_COCKTAILS_SUCCESS
} from "../actionTypes";

const initialState = {
  cocktails: [],
  userCocktails: [],
  error: null
};


const cocktailsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_COCKTAILS_SUCCESS:
      return {...state, cocktails: action.cocktails};
    case FETCH_USER_COCKTAILS_SUCCESS:
      return {...state, userCocktails: action.userCocktails};
    case FETCH_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
};

export default cocktailsReducer;