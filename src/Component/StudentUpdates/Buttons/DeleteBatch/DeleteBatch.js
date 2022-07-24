import React from 'react';
import Typography from '../../../MUI/Typography/Typography'
import Button from '@material-ui/core/Button';
import classes from '../BasicStyles.module.css'

   const DeleteBatch = (props) => {
        let visibleComponent = <div> <Typography>No batch was selected</Typography> <div className={classes.Center}> <Button variant="contained" className={classes.Safe} onClick={props.close}>Cancle</Button></div></div>
        
        if(props.batch){
            visibleComponent = <div><Typography>Are you sure, you want to delete batch {props.batch}</Typography>
            <div className={classes.Center}>
            <Button variant="contained" className={classes.Danger} onClick={props.deleteBatch}>Delete</Button>
            <Button variant="contained" className={classes.Safe} onClick={props.close}>Cancle</Button>
            </div></div>
        }

        return visibleComponent
   }


export default DeleteBatch