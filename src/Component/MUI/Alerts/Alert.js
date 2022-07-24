import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      }, 
    },
    Cover :{
        margin:theme.spacing(2),
        backgroundColor: theme.palette.secondary.light
    }
  }));

const DescriptionAlerts = (props) => {
    const classes = useStyles();
    const severity = props.code === 200 ? "success" : props.code === 400 ? "warning" : props.code === 500 ? "error" : "info"
    return (
      <div className={classes.root}>
        <Alert className={classes.Cover} severity={severity}>
          <AlertTitle>{props.code} : {props.action}</AlertTitle>
          <div>By {props.from} : <strong>{props.message}</strong> <br />At : {moment(props.time).format("L, LTS")}</div>
        </Alert>
      </div>
    );
}

export default DescriptionAlerts