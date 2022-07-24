import React from 'react';
import Paper from '../MUI/Paper/Paper'
import classes from './LoginPage.module.css'
import {FormControl} from '@material-ui/core'; 
import {NavLink} from 'react-router-dom'
import {TextField} from '@material-ui/core';
import Avatar from '../../Assets/Avatar.png'
import Button from './button'

const LoginPage = (props) => {
    return(
        <Paper width="30%" isNotWidth={true} extraStyles={{zIndex:2}}>
        <div className={classes.Login}>
         <div> 
           <FormControl>
                <div className={classes.stdimg}>
                    <img alt="std" src={Avatar} width="35%"/>
                </div>
                <form className={classes.root} autoComplete="off">
                    <div className={classes.Fields}>   
                        <TextField required={true} value={props.id} onChange={props.idHandler} id="outlined-basic" type="text" label="Admin ID" variant="outlined" />
                        <TextField required={true} value={props.password} onChange={props.passwordHandler} id="outlined-basic" type="password" label="Password" variant="outlined" />
                        <NavLink to="/forgot-password" style={{justifyContent: "flex-start", color: "blue", textDecoration: "none"}}>Forgot Password !</NavLink>
                        <Button Submit={props.loginHandler}></Button>
                    </div>
                </form>
            </FormControl>  
         </div>
         </div>  
        </Paper>
    )
}

export default LoginPage