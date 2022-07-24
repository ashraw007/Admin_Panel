import React, { Component } from 'react';
import Typography from '../../Component/MUI/Typography/Typography' 
import SimpleAccordion from '../../Component/MUI/Accordions/SimpleAccordion'
import classes from './SiteUpdates.module.css';
import NoticeUpdate from '../../Component/SiteUpdates/Notices/Notices'
import Fee from '../../Component/SiteUpdates/Fees/Fee'
import Button from '@material-ui/core/Button';
import axios from '../../axios'
import SnackBar from '../../Component/MUI/snackbar/snackbar'


   class SiteUpdates extends Component {
       state = {
        noticesArray: [],
        isSavableNotices: false,
        isSavableFee: false,
        fee:{
            normalFee: 0,
            backExamFee: 0,
            maxPerSemesterFee: 0,
            minLateFee: 0,
            maxLateFee: 0,
            minLateFeeDate: 0,
            maxLateFeeDate:0
        },
        contentFailed: false,
        errorMessage: "",
        type: "error"
       }

       onChangeNoticeHandler = (event,id) => {
            const updatedNotice = {...this.state.noticesArray.find(notice => notice.id === id)}
            updatedNotice[event.target.id] = event.target.value;
            const updatedNotices = [...this.state.noticesArray]
            const index = updatedNotices.findIndex(key => key.id === id)
            updatedNotices[index] = updatedNotice
            this.setState({noticesArray : updatedNotices, isSavableNotices: true})
       }

       onChangeFeeHandler = (event,id) => {
            const updatedFee = {...this.state.fee}

            if(! typeof event.target.value === "number"){
                return ;
            }

            updatedFee[id] = parseInt(event.target.value)
            this.setState({fee: updatedFee, isSavableFee: true})
       }

       onSaveNotices = () => {
           axios.patch('/api/admin/settings/notices', {notices: this.state.noticesArray}, {withCredentials: true})
           .then(res => {
               if(res.data.success === true){
                this.setState({type: "success", contentFailed: true, errorMessage: "Notice updated successfully !"})
                setTimeout(()=>{
                    this.setState({contentFailed: false, errorMessage: '', type: "errror"})
                }, 3200)
               }
           })
           .catch(err => {
                this.setState({contentFailed: true, errorMessage: err.errorMessage})
                setTimeout(()=>{
                    this.setState({contentFailed: false, errorMessage: ''})
                }, 3200)
           })
       }

       onSaveFee = () => {
           axios.patch('/api/admin/settings/fee',{
               ...this.state.fee
           },{withCredentials: true})
           .then(res => {
            if(res.data.success === true){
                this.setState({type: "success", contentFailed: true, errorMessage: "Fee updated successfully !"})
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

       onTimestampChangeHandler = (date,id) => {
        let fee = {...this.state.fee}
        fee[id] = new Date(date._d).getTime()
        this.setState({fee: fee,  isSavableFee: true})
        }


       componentDidMount(){
           axios.get('/api/admin/settings', {withCredentials: true})
           .then(res => {
                let notices = [...this.state.noticesArray]
                notices = res.data.notices.map(notice => { 
                    notice.id = notice._id
                    delete notice._id
                    return notice
                })
                let fee = {...this.state.fee}
                fee.normalFee = res.data.normalFee
                fee.backExamFee = res.data.backExamFee
                fee.maxPerSemesterFee = res.data.maxPerSemesterFee
                fee.maxLateFee = res.data.maxLateFee
                fee.minLateFee = res.data.minLateFee
                fee.minLateFeeDate = res.data.minLateFeeDate
                fee.maxLateFeeDate = res.data.maxLateFeeDate
                this.setState({noticesArray: notices, fee: fee})
           }).catch(err => {
                this.setState({contentFailed: true, errorMessage: err.errorMessage})
                setTimeout(()=>{
                    this.setState({contentFailed: false, errorMessage: ''})
                }, 3200)
           })
       }

   render(){

        const typographyStyle={variant: "h2", align:"center"}
        const accordionIconStyle = {color:"white", fontSize: "2rem"}
        const accordionTypographyStyles = {variant:"h6"}

        const notices = this.state.noticesArray.map((notice,index) => 
            <SimpleAccordion 
                key={notice.id}
                heading={notice.title || 'Empty Notice'}
                iconStyle={accordionIconStyle}
                typographyStyle={accordionTypographyStyles}
                >
                <NoticeUpdate
                    id={notice.id} 
                    heading={notice.title} 
                    description={notice.desc}    
                    changed={this.onChangeNoticeHandler}
                    />
            </SimpleAccordion> 
        )

        const fee = [] 
        for (const feeType in this.state.fee) {
            fee.push(<Fee label={feeType} TimeHandler={this.onTimestampChangeHandler} changed={this.onChangeFeeHandler} value={this.state.fee[feeType]} />)
        }

       return (
            <div className={classes.Site}>   
                <Typography styles={typographyStyle}>Updates</Typography>
                <div className={classes.Accordion}>
                    <SimpleAccordion 
                        heading="Notices" 
                        iconStyle={accordionIconStyle}
                        typographyStyle={accordionTypographyStyles}
                        >
                            <div className={classes.Notices}>
                                {notices}      
                                <Button
                                    variant="contained" 
                                    color="primary" 
                                    disabled={!this.state.isSavableNotices} 
                                    onClick={this.onSaveNotices}
                                    > Save
                                </Button>
                            </div>
                    </SimpleAccordion>
                    <SimpleAccordion 
                        heading="Fees" 
                        iconStyle={accordionIconStyle} 
                        typographyStyle={accordionTypographyStyles}
                        >
                        <div className={classes.Notices}>
                        {fee}      
                        <Button
                            variant="contained" 
                            color="primary" 
                            disabled={!this.state.isSavableFee} 
                            onClick={this.onSaveFee}
                            > Save
                        </Button>
                    </div>
                    </SimpleAccordion>
                </div>
                {this.state.contentFailed ? <SnackBar message={this.state.errorMessage} type={this.state.type} /> : null}
                </div>
        )
   }
}

export default SiteUpdates