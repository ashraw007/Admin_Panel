import React, { Component } from 'react';
import ForgotPassword from '../../Component/UI/ForgotPassword/ForgotPassword'
import classes from './Password.module.css';
import axios from '../../axios'
import Snackbar from '../../Component/MUI/snackbar/snackbar'

class Password extends Component {  

    state={
        adminID: '',
        showSnackbar : false,
        message : '',
        type: ''
    }

    adminIDChangeHandler = (value) => {
        this.setState({adminID: value })
    }

    ResetPassword = ()=>{

        axios.post('/api/admin/auth/resetpwd', { adminID: this.state.adminID})
        .then(res => {
            this.setState({showSnackbar: true, message: res.data.message, type: 'info' })
            setTimeout(()=>{
                this.setState({showSnackbar: false, message: '', type: '' })
            }, 3200)
        })
        .catch(err => {
            this.setState({showSnackbar: true, message: err.errorMessage, type: 'error' })
            setTimeout(()=>{
                this.setState({showSnackbar: false, message: '', type: '' })
            }, 3200)
        } )
    }

    render() {
        return(
            <div className={classes.Container}>
            <div className={classes.Background}></div>  
            <div className={classes.Layout}>
            <ForgotPassword 
                inputHandler={this.adminIDChangeHandler} 
                value={this.state.adminID} 
                submit={this.ResetPassword}
                />
            {this.state.showSnackbar === true ? <Snackbar message={this.state.message} type={this.state.type}/> : null}
            </div>    
            </div>
        )
    }
}

export default Password