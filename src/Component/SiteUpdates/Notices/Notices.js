import React from 'react';
import TextField from '@material-ui/core/TextField';
import classes from './Notice.module.css'


   const Notices = (props) => {

    return(
        <div className={classes.Notice}>
            <TextField onChange={(event)=>props.changed(event,props.id)} variant="filled" id="title" label="Heading" fullWidth={true} value={props.heading} />
            <TextField onChange={(event)=>props.changed(event,props.id)}  multiline fullWidth variant="filled" id="desc" label="Description" value={props.description}/>
        </div>
    )

   }

export default Notices