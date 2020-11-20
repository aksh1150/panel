import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import './Popup.scss';
import CloseIcon from '@material-ui/icons/Close';
import { Buttons } from '../../molecules';

import { Heading } from '../../atoms';

const Popup = ({ title, isDialogOpen, children, closeDialog, subtitle }) => {
  const [open, setOpen] = useState(isDialogOpen);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
        disableBackdropClick
        className="dialogClass"
        maxWidth="lg"
      >
        <DialogActions>
          <Buttons
            clickEvent={closeDialog}
            noLabel
            noBorder
            icon={<CloseIcon />}
            colour="#222222"
            bg="#ffffff"
            className="close"
          />
        </DialogActions>
        <div className="dialog-content">
          <DialogTitle disableTypography id="responsive-dialog-title">
            <Heading type="h4">{title}</Heading>
            <Heading type="h4" colour="primary">
              {subtitle}
            </Heading>
          </DialogTitle>

          <DialogContent>{children}</DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default Popup;
