import React from "react";
import {Button, ListItemAvatar} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import {NavLink} from "react-router-dom";
import {logoutUser} from "../../store/actions/usersActions";
import {useDispatch} from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import imageNotAvailable from "../../download.png";

const useStyles = makeStyles(theme => ({
    dropDownBtn: {
        color: theme.palette.common.white
    }
}));

const UserMenu = ({user}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        dispatch(logoutUser());
    };

    let avatarImage = imageNotAvailable;

    if (user.facebookImage) {
        avatarImage = user.facebookImage;
    }

    return (
        <>
            <ListItemAvatar>
                <Avatar src={avatarImage} />
            </ListItemAvatar>
            <Button
                id="userMenu"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.dropDownBtn}
            >
                Hello, {user.displayName ? user.displayName : user.username}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem><NavLink className="link" id="new_cocktails" to="/new_cocktails">Add cocktail</NavLink></MenuItem>
                <MenuItem><NavLink className="link" to="userCocktails">My cocktails</NavLink></MenuItem>
                {
                    user && user.role === "admin" &&
                    <MenuItem><NavLink className="link" to="/moderation">Moderation</NavLink></MenuItem>
                }
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;