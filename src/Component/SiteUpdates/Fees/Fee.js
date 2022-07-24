import React from 'react';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker,MuiPickersUtilsProvider  } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

const Fee = (props) => {
    let Input = <TextField label={props.label} type="Number" onChange={(event) => props.changed(event, props.label)} variant="outlined" value={props.value} style={{margin:'2%'}} />
    if(props.label === "minLateFeeDate" || props.label === "maxLateFeeDate"){
        Input = <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker
        style={{ margin: '2%'}}
            autoOk
            allowKeyboardControl={true}
            inputVariant="outlined"
            ampm={true}
            value={props.value || new Date()}
            id={props.label}
            onChange={(date)=>props.TimeHandler(date, props.label)}
            label={props.label}
        />
        </MuiPickersUtilsProvider>
    }

    return (
        Input
    )
   
}

export default Fee