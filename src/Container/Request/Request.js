import React, { Component } from 'react';
import Typography from '../../Component/MUI/Typography/Typography'
import SearchSort from '../../Component/Requests/SearchSort/SearchSort'
import SimpleAccordion from '../../Component/MUI/Accordions/SimpleAccordion'
import Request from '../../Component/Requests/Request/Request'
import classes from './Request.module.css'
import axios from '../../axios'
import SnackBar from '../../Component/MUI/snackbar/snackbar'


   class Requests extends Component {
       state = {
        pendingRequests: [],
        sortedPendingRequest: [],
        modal: false,
        filters:{
            rollNumber: 0,
            branch: '',
            semester: 0
        },
        contentFailed: false,
        errorMessage: "",
        type: "error"
       }

       updateReceipt = (id) => {
            axios.patch('/api/admin/request', {
                id: id,
                success: true
            },{withCredentials: true}).then(res => {
                if(res.data.success === true) {
                    this.setState({contentFailed: true, errorMessage: "Request Changed !", type: "success"})
                    this.onSuccessRefresh()
                    setTimeout(()=>{
                        this.setState({contentFailed: false, errorMessage: '', type: "error"})

                    }, 3200)
                }
            }).catch(err => {
                this.setState({contentFailed: true, errorMessage: err.errorMessage})
                setTimeout(()=>{
                    this.setState({contentFailed: false, errorMessage: ''})
                }, 3200)
            })
       }

       onModalClose = () => {
           this.setState({modal: false})
       }

       onModalOpen = () => {
           this.setState({modal:true})
       }

       onSort = () => {
            let branch = ""
            if(this.state.filters.branch !== ""){
                const branchInit = this.state.filters.branch.split('-')
                branch = branchInit[0] === "CS" ? "Computer Science" : branchInit[0] === "ENE" ? "Electrical & Communication" : branchInit[0] === "AM" ? "AutoMobile" : ""
                branch = branchInit[1] === "M" ? (branch + " - M") : (branch + " - E")    
            }
            
            let filteredRequest = this.state.pendingRequests
                                        .filter(request => request.rollNumber === (this.state.filters.rollNumber !== '' ? parseInt(this.state.filters.rollNumber) : request.rollNumber))
                                        .filter(request => request.semester === (this.state.filters.semester !== '' ? this.state.filters.semester : request.semester))
                                        .filter(request => request.branch === (this.state.filters.batch !== '' ? branch : request.batch))                      
            this.setState({sortedPendingRequest: filteredRequest, modal: false})      
        }

        onSuccessRefresh = () => {
            axios.get('/api/admin/request/', {
                withCredentials: true,
                params: {
                    filters: this.state.filters
                }
            }).then(res => {
                let requests = [...this.state.pendingRequests]
                requests = res.data.request
                this.setState({pendingRequests: requests})
            }).catch(err => {
                this.setState({contentFailed: true, errorMessage: err.errorMessage})
                setTimeout(()=>{
                    this.setState({contentFailed: false, errorMessage: ''})
                }, 3200)
            })
        }

        onSearch = () =>{
            axios.get('/api/admin/request/', {
                withCredentials: true, 
                params:{ 
                    filters: this.state.filters
                }
            }).then(res => {
                let requests = [...this.state.pendingRequests]
                requests = res.data.request
                this.setState({pendingRequests: requests})
            }).catch(err => {
                this.setState({contentFailed: true, errorMessage: err.errorMessage})
                setTimeout(()=>{
                    this.setState({contentFailed: false, errorMessage: ''})
                }, 3200)
            })
            this.setState({modal: false})
        }

        componentDidMount(){
            axios.get('/api/admin/request/', {
                withCredentials: true,
                params: {
                    filters: this.state.filters
                }
            }).then(res => {
                let requests = [...this.state.pendingRequests]
                requests = res.data.request
                this.setState({pendingRequests: requests})
            }).catch(err => {
                this.setState({contentFailed: true, errorMessage: err.errorMessage})
                setTimeout(()=>{
                    this.setState({contentFailed: false, errorMessage: ''})
                }, 3200)
            })
        }

       onSelectHandler = (id,eventValue ) =>  {
        const updatedFilters = {...this.state.filters}
        updatedFilters[id] = eventValue
        this.setState({filters: updatedFilters }) 
    }

       onInputHandler = (event) => {
           const updatedFilters = {...this.state.filters}
           updatedFilters.rollNumber = event.target.value
           this.setState({filters: updatedFilters})
        }

   render(){
       const typographySettings = {align:'center', variant:'h2'}

       
        let mappableRequests = this.state.sortedPendingRequest.length === 0 ? this.state.pendingRequests : this.state.sortedPendingRequest 
        if(mappableRequests === undefined){
            mappableRequests = []
        }
        const updates = mappableRequests.map(request =><SimpleAccordion 
                heading={`Roll Number: ${request.rollNumber}, Branch: ${request.branch}, Semester: ${request.semester}`}>
                <Request {...request} click={this.updateReceipt} />
                </SimpleAccordion>)

       return (
           <div className={classes.Requests}>
                <Typography styles={typographySettings}>Requests</Typography>
                <SearchSort 
                modal={this.state.modal}
                onModalOpen = {this.onModalOpen}
                onModalClose = {this.onModalClose}
                selectHandler = {this.onSelectHandler}
                inputHandler = {this.onInputHandler}
                values={this.state.filters}
                sort={this.onSort}
                search={this.onSearch}
                />
                <div className={classes.Request}>
                {updates}
                </div>
                {this.state.contentFailed ? <SnackBar message={this.state.errorMessage} type={this.state.type} /> : null}
                </div>
       )
   }
}

export default Requests



