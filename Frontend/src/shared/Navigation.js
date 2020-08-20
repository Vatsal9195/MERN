import React, { useContext } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './context/auth-context';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    navlink: {
        color: 'black',
        textDecoration: 'none'
    }
}))

const Navigation = props => {
    const classes = useStyles();

    const auth = useContext(AuthContext);

    return (
        <React.Fragment>
            <List component="nav" >
                <NavLink to="/" exact className={classes.navlink}>
                    <ListItem button onClick={props.close}>
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary="All Users" />
                    </ListItem>
                </NavLink>
                {auth.isLoggedIn && (
                    <NavLink to="/u1/places" className={classes.navlink}>
                        <ListItem button onClick={props.close}>
                            <ListItemIcon>

                            </ListItemIcon>
                            <ListItemText primary="My Places" />
                        </ListItem>
                    </NavLink>)
                }

                {auth.isLoggedIn && (
                    <NavLink to="/places/new" className={classes.navlink}>
                        <ListItem button onClick={props.close}>
                            <ListItemIcon>

                            </ListItemIcon>
                            <ListItemText primary="Add Places" />
                        </ListItem>
                    </NavLink>
                )}
            </List>
        </React.Fragment>
    )
}

export default Navigation;