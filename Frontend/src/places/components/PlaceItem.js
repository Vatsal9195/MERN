import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { NavLink } from 'react-router-dom';
import MapModal from './MapModal';
import Map from '../../shared/Map';
import { AuthContext } from '../../shared/context/auth-context';

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

    const auth = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [deleteOpen, setdeleteOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteOpen = () => {
        setdeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setdeleteOpen(false);
    };

    return (
        <React.Fragment>
            {/* map modal */}
            <MapModal
                open={open}
                handleClose={handleClose}
                header={props.address}
                footer={<Button variant="contained" color="secondary" onClick={handleClose}>CLOSE</Button>}>
                <div>
                    <Map location={props.coordinates} />
                </div>
            </MapModal>
            {/* delete modal */}
            <Dialog
                open={deleteOpen}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Do you Want to Delete ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This Action cant be Reversed once deleted.
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} color="primary">
                        Disagree
          </Button>
                    <Button onClick={() => { handleDeleteClose(); console.log("DELETING......") }} color="primary" autoFocus>
                        Agree
          </Button>
                </DialogActions>
            </Dialog>

            {/* Item Card */}
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
                    { auth.isLoggedIn && (<React.Fragment>
                    <NavLink to={`/places/${props.id}`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary">Edit</Button>
                    </NavLink>
                    <Button onClick={handleDeleteOpen} variant="contained" color="secondary" startIcon={<DeleteIcon />}>Delete</Button>
                    </React.Fragment>)
                    }
                </CardActions>
            </Card>

        </React.Fragment>
    )
}

export default PlaceItem;