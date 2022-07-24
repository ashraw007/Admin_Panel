import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function FormPropsTextFields(props) {

  return (
      <TextField {...props.settings}/>
  );
}
