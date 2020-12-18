import axios from "../../axiosApi";
import {
    CREATE_COCKTAIL_SUCCESS,
    FETCH_COCKTAILS_SUCCESS,
    FETCH_FAILURE, FETCH_USER_COCKTAILS_SUCCESS,
} from "../actionTypes";
import {push} from "connected-react-router";

const fetchCocktailsSuccess = cocktails => {
    return {type: FETCH_COCKTAILS_SUCCESS, cocktails};
};

const fetchUserCocktailsSuccess = userCocktails => {
    return {type: FETCH_USER_COCKTAILS_SUCCESS, userCocktails};
};

const fetchFailure = error => {
    return {type: FETCH_FAILURE, error};
};

const createCocktailSuccess = () => {
    return {type: CREATE_COCKTAIL_SUCCESS};
};

export const fetchCocktails = () => {
    return async dispatch => {
        try {
            await axios.get("/cocktails").then(response => {
                dispatch(fetchCocktailsSuccess(response.data));
            })
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(fetchFailure(e.response.data));
            } else {
                dispatch(fetchFailure({global: "No internet"}));
            }
        }
    };
};

export const fetchUserCocktails = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {'Authorization': token};
            await axios.get(`/cocktails/${id}`, {headers}).then(response => {
                dispatch(fetchUserCocktailsSuccess(response.data));
            })
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(fetchFailure(e.response.data));
            } else {
                dispatch(fetchFailure({global: "No internet"}));
            }
        }
    };
};

export const createCocktail = cocktailData => {

    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {'Authorization': token};
            await axios.post("/cocktails", cocktailData, {headers})
            dispatch(createCocktailSuccess());
            dispatch(push("/"));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(fetchFailure(e.response.data));
            } else {
                dispatch(fetchFailure({global: "No internet"}));
            }
        }
    };
};




