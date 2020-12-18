import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Cocktails from "./containers/Cocktails/Cocktails";
import NewCocktail from "./containers/NewCocktail/NewCocktail";
import Moderation from "./containers/Moderation/Moderation";
import UserCocktails from "./containers/UserCocktails/UserCocktails";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to={redirectTo} />
};

const Routes = ({user}) => {
        return (
            <Switch>
                <Route path="/" exact component={Cocktails} />
                <ProtectedRoute
                    path="/new_cocktails"
                    exact
                    component={NewCocktail}
                    isAllowed={user}
                    redirectTo="/"
                />
                <ProtectedRoute
                    path="/moderation"
                    exact
                    component={Moderation}
                    isAllowed={user && user.role === "admin"}
                    redirectTo="/"
                />
                    <ProtectedRoute
                        path="/userCocktails"
                        exact
                        component={UserCocktails}
                        isAllowed={user && user.role === "admin"}
                        redirectTo="/"
                    />
                <Route render={() => <h1>404 Not Found</h1>}/>
            </Switch>
        );
}

export default Routes;