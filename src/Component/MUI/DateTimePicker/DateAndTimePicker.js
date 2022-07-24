import React from 'react';
import { DateTimePicker,MuiPickersUtilsProvider  } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

   const DateAndTimePicker = (props) => (
       <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker
        style={{width:'100%'}}
            autoOk
            allowKeyboardControl={true}
            variant="dialog"
            ampm={true}
            clearable={true}
            value={props.values[props.id] || new Date()}
            id={props.id}
            disableFuture={true}
            onChange={(date)=>props.clicked(date, props.id)}
            label={props.label}
        />
        </MuiPickersUtilsProvider>
   )

export default DateAndTimePicker