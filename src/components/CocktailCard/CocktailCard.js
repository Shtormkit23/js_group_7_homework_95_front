import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import imageNotAvailable from "../../download.png";
import {ListItemAvatar} from "@material-ui/core";
import {apiURL} from "../../constants";
import Ingredient from "./Ingredient";
import {deleteItem, publish} from "../../store/actions/adminActions";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 380,
        padding: 0,
        marginRight: 35,
        marginBottom: 20
    },
    media: {
        height: '415px'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    cardHeader: {
        display: 'flex'
    },
    cardImage: {
        margin: '18px 10px 0 15px'
    },
    cardTitle: {
        margin: "15px 0 0 0",
        fontSize: 24,
        textTransform: "uppercase",
        letterSpacing: 4
    },
    cardAuthor: {
        margin: "0 0 20px 0",
        color: "gray"
    },
    image: {
        height: 60,
        width: 60
    },
    cardRecipe: {
        margin: "0 0 10px 0",
        fontSize: 20,
        textTransform: "uppercase",
        letterSpacing: 4
    },
}));

const CocktailCard = ({user, title, image, recipe, ingredients, id, path, published}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch();
    let userSessions = useSelector(state => state.users.user);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    let avatarImage = imageNotAvailable;
    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiURL + "/uploads/" + image;
    }


    if (user && user.facebookImage) {
        avatarImage = user.facebookImage;
    }

    return (
        <Card className={classes.root}>
            <div className={classes.cardHeader}>
                <div>
                    <ListItemAvatar className={classes.cardImage}>
                        <Avatar src={avatarImage} className={classes.image}/>
                    </ListItemAvatar>
                </div>
                <div>
                    <p className={classes.cardTitle}>{title}</p>
                    <p className={classes.cardAuthor}>{"автор: " + user.displayName}</p>
                </div>
            </div>
            <CardMedia
                className={classes.media}
                image={cardImage}
                title="Paella dish"
            />
            <CardContent>
                    {ingredients && ingredients.map(ingredient => {
                        return <Ingredient
                            key={ingredient.name}
                            id={ingredient.name}
                            name={ingredient.name}
                            qty={ingredient.qty}
                        />
                    })}
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography className={classes.cardRecipe}>Method:</Typography>
                    <Typography>
                        {recipe}
                    </Typography>
                    {
                        path && path.location.pathname === "/moderation" && userSessions && userSessions.role === "admin" &&
                        <button className="button-4" onClick={() => dispatch(deleteItem(id))}><span>Delete item</span></button>
                    }
                    {
                        path && path.location.pathname === "/moderation" && userSessions && userSessions.role === "admin" && published !== true &&
                            <button className="button-4" onClick={() => dispatch(publish(id))}><span>Published</span></button>
                    }
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default CocktailCard;