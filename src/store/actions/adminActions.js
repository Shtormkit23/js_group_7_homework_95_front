import axios from "../../axiosApi";
import {FETCH_COCKTAILS_SUCCESS, FETCH_FAILURE} from "../actionTypes";

const fetchAllCocktailsSuccess = cocktails => {
    return {type: FETCH_COCKTAILS_SUCCESS, cocktails};
};

const fetchFailure = error => {
    return {type: FETCH_FAILURE, error};
};

export const fetchAllCocktails = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {'Authorization': token};
            await axios.get("/moderation/cocktails", {headers}).then(response => {
                dispatch(fetchAllCocktailsSuccess(response.data));
            })}catch(e) {
            if (e.response && e.response.data) {
                dispatch(fetchFailure(e.response.data));
            } else {
                dispatch(fetchFailure({global: "No internet"}));
            }
        }
    };
};

export const publish = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {'Authorization': token};
            await axios.put(`/moderation/cocktails/${id}`, {}, {headers});
            dispatch(fetchAllCocktails());
        } catch(e) {
            if (e.response && e.response.data) {
                dispatch(fetchFailure(e.response.data));
            } else {
                dispatch(fetchFailure({global: "No internet"}));
            }
        }
    };
};

export const deleteItem = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {'Authorization': token};
            await axios.delete(`/moderation/cocktails/${id}`, {headers});
            dispatch(fetchAllCocktails());
        } catch(e) {
            if (e.response && e.response.data) {
                dispatch(fetchFailure(e.response.data));
            } else {
                dispatch(fetchFailure({global: "No internet"}));
            }
        }
    };
};
