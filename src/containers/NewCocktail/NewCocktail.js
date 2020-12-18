import React from "react";
import {useDispatch} from "react-redux";
import CocktailCreationForm from "../../components/CocktailCreationForm/CocktailCreationForm";
import {createCocktail as onCocktailCreated} from "../../store/actions/cocktailsActions";

const NewCocktail = () => {
    const dispatch = useDispatch();

    const createCocktail = cocktailData => {
        dispatch(onCocktailCreated(cocktailData));
    };

    return (
        <>
            <h1>New cocktail</h1>
            <CocktailCreationForm
                onSubmit={createCocktail}
            />
        </>
    );
};

export default NewCocktail;