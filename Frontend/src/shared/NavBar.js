import React, { useContext, useState } from 'react';

import { AppBar, Button, Drawer, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Navigation from './Navigation';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './context/auth-context';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        color: 'white'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#0166FF'
    },
    title: {
        flexGrow: 1,
        color: 'white'
    },
    drawer: {
        width: '250px',
        flexShrink: 0
    },
    toolBar: {
        backgroundColor: '#0166FF'
    }
}))

const NavBar = props => {

    const classes = useStyles();
    const [open, setopen] = useState(false);

    const auth = useContext(AuthContext);

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        className={classes.menuButton}
                        onClick={() => setopen(!open)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Your Places
                    </Typography>
                    <NavLink to="/auth" exact style={{ textDecoration: 'none', color: 'white' }}>
                        {auth.isLoggedIn ? (
                            <Button color="inherit" >Logout</Button>) :
                            <Button color="inherit" >Login</Button>}
                    </NavLink>
                </Toolbar>
            </AppBar>
            <Drawer
                open={open}
                variant="temporary"
                className={classes.drawer}
                classes={{ paper: classes.drawer }}
                onClose={() => setopen(!open)}>
                <Toolbar className={classes.toolBar}>
                    <IconButton
                        edge="start"
                        color="default"
                        className={classes.menuButton}
                        onClick={() => setopen(!open)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Your Places
                    </Typography>
                </Toolbar>
                <Navigation close={() => setopen(false)} />
            </Drawer>
        </div>
    )
}

export default NavBar;