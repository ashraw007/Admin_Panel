import React from 'react';
import Paper from '../../MUI/Paper/Paper'
import TextField from '@material-ui/core/TextField';
import SelectButton from '../../MUI/Select/Select'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: '2% 1%',
      minWidth: '50%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
  }
}));


const ValidateReceipts = (props) => {
    
    const semester = {
        title: 'Semester',
        id:'semester',
        options: [
            {value: 1, text: 'Semester One'},
            {value: 2, text: 'Semester Two'},
            {value: 3, text: 'Semester Three'},
            {value: 4, text: 'Semester Four'},
            {value: 5, text: 'Semester Five'},
            {value: 6, text: 'Semester Six'},
            {value: 7, text: 'Semester Seven'},
            {value: 8, text: 'Semester Eight'},
            {value: 9, text: 'Semester Nine'},
            {value: 10, text: 'Semester Ten'},

        ]
    }

    const classes = useStyles();

    const paperStyle={
        borderRadius: '40px',
        height: '100%',
        padding: 20,
        margin: '3% 10%'
    }

    return(
        <Paper extraStyles={paperStyle} bgcolor="white">
        <div className={classes.root}>
            <SelectButton {...semester} value={props.semester} clicked={props.onSelectHandler}/>
            <TextField placeholder="Roll Number" id="rollNumber" value={props.rollNumber} fullWidth onChange={(event)=>{props.onInputHandler(event)}} />
            <TextField placeholder="Chalan Number" id="chalanNumber" value={props.chalanNumber} fullWidth onChange={(event)=>{props.onInputHandler(event)}} />
            <div style={{display:'flex', justifyContent:'center'}}><Button onClick={props.onSubmit} variant="contained" color="primary" style={{margin:'3%'}}>Submit</Button></div>
            </div>
            </Paper>
    )
   }

export default ValidateReceipts