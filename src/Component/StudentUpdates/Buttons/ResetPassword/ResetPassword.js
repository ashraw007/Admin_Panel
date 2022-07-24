import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import classes from '../BasicStyles.module.css'
import { TextField } from '@material-ui/core';


   const IncreaseSemester = (props) => {
   
    const [rollNumber, setRollNumber] = useState(0)
   
    return(
        <div>
        <TextField id="Roll Number" label="Roll Number" onChange={(event) => setRollNumber(event.target.value)} variant="filled"/>
        {"\n"}
        <div className={classes.Center}>
        <Button variant="contained" className={classes.Promote} onClick={()=>props.changePassword(rollNumber)}>Yes</Button>
        <Button variant="contained" className={classes.Safe} onClick={props.close}>Cancle</Button>
        </div></div>
    
    )

  
    }

export default IncreaseSemester