import React, {useEffect} from "react";
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllCocktails} from "../../store/actions/adminActions";
import CocktailCard from "../../components/CocktailCard/CocktailCard";

const Moderation = (props) => {
    const dispatch = useDispatch();
    const cocktails = useSelector(state => state.cocktails.cocktails);

    useEffect(() => {
        dispatch(fetchAllCocktails());
    }, [dispatch]);

    return (
        <>
            <Grid container direction="column" spacing={2}>
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
                            path={props}
                        />
                    })}
                </Grid>
            </Grid>
        </>
    );
};

export default Moderation;