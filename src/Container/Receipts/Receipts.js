import React, { Component } from 'react';
import ValidateReceipt from '../../Component/Receipt/ValidateReceipt/ValidateReceipt'
import ShowReceipts from '../../Component/Receipt/ShowReceipts/ShowReceipts'
import Button from '@material-ui/core/Button';
import Typography from '../../Component/MUI/Typography/Typography'         
import classes from './Receipts.module.css'
import axios from '../../axios'
import SnackBar from '../../Component/MUI/snackbar/snackbar'
import ReceiptValidate from '../../Component/Receipt/ReceiptValidate/ReceiptValidate'

class Receipts extends Component {
       state = {
           isValidate: true,
           semester: null,
           rollNumber: 0,
           chalanNumber: '',
           contentFailed: false,
           errorMessage: "",
           type: "error",
           receiptData: {}
       }

   
       toggleHandler = () =>{
           this.setState((state)=>({isValidate: !state.isValidate}))
       }

       onSelectHandler = (id,value) => {
        this.setState({[id]: value })
       }

       onInputHandler = (event) => {
            this.setState({[event.target.id] : event.target.value})
       }

       onAcceptHandler = () => {
            axios.post('/api/admin/receipts/validate', 
            {orderID: this.state.receiptData.orderID, paymentID: this.state.receiptData.razorpayPaymentID },
            {withCredentials: true}).then(res => {
                if(res.data.saved === true){
                    this.setState({type: "success", contentFailed: true, errorMessage: "Receipt submitted successfully !"})
                    setTimeout(()=>{
                        this.setState({contentFailed: false, errorMessage: '', type: "errror"})
                    }, 3200)
                }
            }).catch(err => {
                this.setState({contentFailed: true, errorMessage: err.errorMessage})
                setTimeout(()=>{
                    this.setState({contentFailed: false, errorMessage: ''})
                }, 3200)
            })
       }

       onSubmitHandler = () => {
           axios.get('/api/admin/receipts/validate', {
               withCredentials: true,
               params: {
                   semester: this.state.semester,
                   rollNumber: this.state.rollNumber,
                   receiptNumber: `receipt_${this.state.chalanNumber}`
               }
           }).then(res => {
                let receiptData = {...this.state.receiptData}
                receiptData = res.data
                this.setState({receiptData: receiptData})
           }).catch(err =>{
            this.setState({contentFailed: true, errorMessage: err.errorMessage})
            setTimeout(()=>{
                this.setState({contentFailed: false, errorMessage: ''})
            }, 3200)
           })
       }


     render(){
        let component = <div>
        <ValidateReceipt
            onSelectHandler={this.onSelectHandler}
            onInputHandler={this.onInputHandler}
            rollNumber={this.state.rollNumber}
            chalanNumber={this.state.chalanNumber}
            semester={this.state.semester}
            onSubmit={this.onSubmitHandler}
        />
        { Object.keys(this.state.receiptData).length !== 0 ?  <ReceiptValidate accept={this.onAcceptHandler} data={this.state.receiptData} /> : null }
        </div>
        let heading = "Validate Receipt"
        let buttonText = "Toggle to show receipts"
        if(!this.state.isValidate){
            heading = "Receipt Logs"
            component = <ShowReceipts />
            buttonText = "Toggle to validate receipt"
        }

        const TypographyStyles = {align: 'center', variant:"h2"}

       return (
           <React.Fragment>
                <Typography styles={TypographyStyles}>{heading}</Typography>
                <div className={classes.Center}>
                    <Button variant="contained" color="primary" onClick={this.toggleHandler}>{buttonText}</Button>
                </div>
                {component}
                {this.state.contentFailed ? <SnackBar message={this.state.errorMessage} type={this.state.type} /> : null} 
           </React.Fragment>
       )
   }
}

export default Receipts