import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { NavLink } from 'react-router-dom';
import MapModal from './MapModal';
import Map from '../../shared/Map';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
});

const PlaceItem = props => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <MapModal
                open={open}
                handleClose={handleClose}
                header={props.address}
                footer={<Button variant="contained" color="secondary" onClick={handleClose}>CLOSE</Button>}>
                    <div>
                        <Map location={props.coordinates} />
                    </div>
                </MapModal>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia className={classes.media}
                        image={props.image}
                        title={props.title} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.title}
                        </Typography>
                        <Typography variant="body2" color="textPrimary" component="p">
                            {props.address}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>View on map</Button>
                    <NavLink to={`/places/${props.id}`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary">Edit</Button>
                    </NavLink>
                    <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>Delete</Button>
                </CardActions>
            </Card>

        </React.Fragment>
    )
}

export default PlaceItem;