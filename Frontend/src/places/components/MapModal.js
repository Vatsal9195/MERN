import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';


const MapModal = props => {

    return (
        <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={props.open}
            onClose={props.handleClose}>
            <DialogTitle style={{ backgroundColor: '#FFD613' }}>
                {props.header}
            </DialogTitle>
            <DialogContent >
                {props.children}
            </DialogContent>
            <DialogActions>
                {props.footer}
            </DialogActions>
        </Dialog>
    )
}

export default MapModal;