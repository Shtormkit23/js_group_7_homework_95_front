import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FormElement from "../Form/FormElement";
import FileInput from "../Form/FileInput";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
            outline: "black",
            paddingBottom: 10
        }, '&:hover': {
            border: "black"
        }, '&:active': {
            border: "black"
        }
    }
}));

const CocktailCreationForm = ({onSubmit}) => {
    const classes = useStyles();
    const error = useSelector(state => state.cocktails.error);
    const [state, setState] = useState({
        title: "",
        recipe: "",
        ingredients: [{
            name: '',
            qty: ''
        }],
        image: ""
    });

    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key,  Array.isArray(state[key]) ? JSON.stringify(state[key]) : state[key]);
        });
        onSubmit(formData);
    };

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const updateIngredients = (index,e) => {
        const ingredients = [...state.ingredients];
        const property = 'ingredients';

        const name = e.target.name;
        ingredients[index][name] = e.target.value;

        setState(prevState => {
            return {...prevState, [property]: ingredients};
        });
    };

    const addIngredientField = () => {
        const ingredients = [...state.ingredients];
        const property = 'ingredients';

        const newField = {
            name: '',
            qty: ''
        }

        ingredients.push(newField)

        setState(prevState => {
            return {...prevState, [property]: ingredients};
        });
    };

     const removeIngredientField = (index) => {
        const ingredients = [...state.ingredients];
        const property = 'ingredients';
        const newIngredients = ingredients.splice(index,1);

        setState(prevState => {
            return {...prevState, [property]: newIngredients};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setState(prevState => ({...prevState, [name]: file}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch(e) {
            return undefined;
        }
    };

    return (
        <form
            className={classes.root}
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <FormElement
                error={getFieldError("title")}
                name="title"
                label="Title"
                required={true}
                value={state.title}
                onChange={inputChangeHandler}
            />
            <FormElement
                error={getFieldError("recipe")}
                name="recipe"
                label="Recipe"
                required={true}
                multiline={true}
                rows={4}
                value={state.recipe}
                onChange={inputChangeHandler}
            />
            {state.ingredients.map((field,index) =>
                <FormControl key={index} fullWidth className={classes.margin} variant="outlined">
                    <FormElement
                        error={getFieldError("name")}
                        name="name"
                        label="Ingredient Name"
                        required={true}
                        multiline={true}
                        value={state.ingredients[index].ingredient}
                        onChange={e => updateIngredients(index,e)}
                    />
                    <FormElement
                        error={getFieldError("qty")}
                        name="qty"
                        label="Amount"
                        required={true}
                        multiline={true}
                        value={state.ingredients[index].qty}
                        onChange={e => updateIngredients(index,e)}
                    />
                    <button type={"button"} className="buttonDeleted" onClick={index => removeIngredientField(index)}>Deleted fields</button>
                </FormControl>
            )}

            <button type={"button"} className="buttonAdd" onClick={addIngredientField}>Add fields</button>

            <FormControl fullWidth className={classes.margin} variant="outlined">
                <FileInput
                    label="Image"
                    name="image"
                    onChange={fileChangeHandler}
                />
            </FormControl>
            <FormControl fullWidth className={classes.margin} variant="outlined">
                <Button
                    id="createRecipe"
                    type="submit"
                    color="primary"
                >
                    Create
                </Button>
            </FormControl>
        </form>
    );
};

export default CocktailCreationForm;