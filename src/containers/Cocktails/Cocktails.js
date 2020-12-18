import React, {useEffect} from "react";
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchCocktails} from "../../store/actions/cocktailsActions";
import CocktailCard from "../../components/CocktailCard/CocktailCard";

const Cocktails = () => {
    const dispatch = useDispatch();
    const cocktails = useSelector(state => state.cocktails.cocktails);

    useEffect(() => {
        dispatch(fetchCocktails());
    }, [dispatch]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container direction="row" justify="space-between" alignItems="center">
            </Grid>
            <Grid item container direction="row" spacing={2}>
                {cocktails.map(cocktail => {
                    return <CocktailCard
                        key={cocktail._id}
                        id={cocktail._id}
                        title={cocktail.title}
                        recipe={cocktail.recipe}
                        ingredients={cocktail.ingredients}
                        image={cocktail.image}
                        published={cocktail.published}
                        user={cocktail.user}
                    />
                })}
            </Grid>
        </Grid>
    );
};

export default Cocktails;