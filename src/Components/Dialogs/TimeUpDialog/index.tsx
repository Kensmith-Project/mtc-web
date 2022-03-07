import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { TransitionProps } from '@mui/material/transitions';
import Zoom from '@mui/material/Zoom';
import React from 'react';
import CloseIcon from '../../../svgs/CloseIcon';
import styles from './timedialog.module.css'

export interface TimeUpDialogProps{
    open?: boolean;
    onClose?: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => any;
    onNext?: ()=> any;
    disableClose?: boolean;
    disableNext?: boolean;
    hideNext?: boolean;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {

    return(
        <Zoom ref={ref} {...props} 
            style={{ transitionDuration: '0.3s' }} 
        />
    )
});

const TimeUpDialog: React.FC<TimeUpDialogProps> = ({ 
    open = false, onNext, onClose, disableClose, hideNext = false,
    disableNext = false 
})=>{

    return(
        <Dialog
            TransitionComponent={Transition}
            PaperProps={{
                sx:{
                    position: 'relative'
                }
            }}
            maxWidth= 'lg'
            open={open}
            //onClose={onClose}
            aria-labelledby="time-up-dialog-title"
            aria-describedby="time-up-dialog-description"
        >
            <DialogContent>
                {/** Close Icon */}
                { !disableClose && <div className={styles.close}>
                    <IconButton aria-label="close" onClick={onClose} >
                        <CloseIcon/>
                    </IconButton>
                </div>}
                
                <div className={styles.content}>
                    <h1>Times Up!</h1>
                    <div className={styles.btnArea}>
                        {!hideNext && <Button onClick={onNext}
                            variant='outlined'
                            disabled={disableNext}
                        >
                            Next
                        </Button>}
                    </div>
                </div>
            </DialogContent>  
        </Dialog>
    )
}

export default TimeUpDialog;