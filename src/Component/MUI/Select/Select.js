import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth:'100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const SelectButton = (props) => {

    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id={props.id}>{props.title}</InputLabel>
            <Select
                labelId={props.id}
                id={props.id}
                value={props.value || ''}
                className={classes.select}
                onChange={(event) => props.clicked(props.id, event.target.value)}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {props.options.map(option => (<MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>))}
            </Select>
        </FormControl>
    )
}

export default SelectButton