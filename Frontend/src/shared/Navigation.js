import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

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
    return (
        <React.Fragment>
            <List component="nav" >
                <NavLink to="/" exact className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary="All Users" />
                    </ListItem>
                </NavLink>

                <NavLink to="/u1/places" className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary="My Places" />
                    </ListItem>
                </NavLink>

                <NavLink to="/places/new" className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary="Add Places" />
                    </ListItem>
                </NavLink>

            </List>
        </React.Fragment>
    )
}

export default Navigation;