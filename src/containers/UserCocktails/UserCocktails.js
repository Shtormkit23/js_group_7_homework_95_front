import React, {useEffect} from "react";
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserCocktails} from "../../store/actions/cocktailsActions";
import CocktailCard from "../../components/CocktailCard/CocktailCard";

const UserCocktails = (props) => {
    const dispatch = useDispatch();
    const userCocktails = useSelector(state => state.cocktails.userCocktails);
    let userSessions = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchUserCocktails(userSessions._id));
    }, [dispatch, userSessions]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container direction="row" justify="space-between" alignItems="center">
            </Grid>
            <Grid item container direction="row" spacing={2}>
                {userCocktails.map(cocktail => {
                    return <CocktailCard
                        key={cocktail._id}
                        id={cocktail._id}
                        title={cocktail.title}
                        recipe={cocktail.recipe}
                        ingredients={cocktail.ingredients}
                        image={cocktail.image}
                        published={cocktail.published}
                        user={cocktail.user}
                        path={props}
                    />
                })}
            </Grid>
        </Grid>
    );
};

export default UserCocktails;