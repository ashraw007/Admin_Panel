import React from 'react';
import Typography from '../../../MUI/Typography/Typography'
import Button from '@material-ui/core/Button';
import classes from '../BasicStyles.module.css'


   const IncreaseSemester = (props) => (
    <div><Typography>Are you sure, you want to increase semester !</Typography>
    <div className={classes.Center}>
    <Button variant="contained" className={classes.Promote} onClick={props.incSem}>Yes</Button>
    <Button variant="contained" className={classes.Safe} onClick={props.close}>Cancle</Button>
    </div></div>

        )

export default IncreaseSemester