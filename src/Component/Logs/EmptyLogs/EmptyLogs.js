import React from 'react';
import Typography from '../../MUI/Typography/Typography'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import classes from './EmptyLogs.module.css'

   const EmptyLogs = (props) => (
        <div className={classes.EmptyLogs}>
            <SentimentDissatisfiedIcon className={classes.Icon}/>
            <Typography>{props.title}</Typography>
        </div>
   )

export default EmptyLogs