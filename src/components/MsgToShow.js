
import React, { useState } from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const MsgToShow = ( {title, body, visible, handleClose}) => {


    function _handleClose() {
        handleClose();
    }

    return (
        <Dialog
        disableBackdropClick
      disableEscapeKeyDown
            open={visible}
            onClose={_handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={_handleClose} color="primary">
                    OK
          </Button>
            </DialogActions>
        </Dialog>
    );
}

export { MsgToShow };