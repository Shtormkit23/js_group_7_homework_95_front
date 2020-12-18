import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {createBrowserHistory} from "history";
import cocktailsReducer from "./reducers/cocktailsReducer";
import usersReducer from "./reducers/usersReducer";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunkMiddleware from "redux-thunk";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import adminReducer from "./reducers/adminReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    cocktails: cocktailsReducer,
    users: usersReducer,
    admin: adminReducer,
    router: connectRouter(history)
});

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user
        }
    });
});

export default store;