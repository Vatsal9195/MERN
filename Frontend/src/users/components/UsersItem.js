import React from 'react';
import { Card, CardHeader, Avatar, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: '300px'
    },
    card: {
        '&:hover': {
            transform: 'scale(1.02)',
            backgroundColor: '#FFE401',
            transition: 'all .2s ease-in-out',
        }
    }
}))

const UsersItem = props => {

    const classes = useStyles();

    return (
        <li className={classes.root}>
            <Link to={`/${props.id}/places`} style={{ textDecoration: 'none' }}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label='user' alt={props.name} src={props.image} />
                        }
                        title={props.name}
                        subheader={`${props.placeCount} ${props.placeCount === 1 ? 'Place' : 'Places'}`}
                    />
                </Card>
            </Link>
        </li>

    )
}

export default UsersItem;