import { Button } from '@material-ui/core';
import React from 'react';
import Typography from '../../MUI/Typography/Typography';
import classes from './ReceiptValidate.module.css'

   const ReceiptValidate = (props) => (
       <div className={classes.Div}>
        <Typography styles={{variant: "h5"}}>Paid Amount : {props.data.amount / 100}</Typography>
        <Typography styles={{variant: "h5"}}>Paid For :</Typography>
        {props.data.notes.map(note => (
            <Typography styles={{variant: "h5", gutterBottom : true}}>{note}</Typography>
        ))}
        <Button variant="contained" color="primary" onClick={props.accept}>Accept</Button>
       </div>
   )

export default ReceiptValidate