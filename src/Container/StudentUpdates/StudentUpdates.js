// PLEASE DONT GET CONFUSED BRANCH AND BATCH IS THE SAME THING FOR THIS PART, KINDLY LOOK FOR VARIABLE CAREFULLY BEFORE DEBUGGING

import React, { Component } from 'react';
import DataGrid from '../../Component/MUI/DataGrid/DataGrid'
import Paper from '../../Component/MUI/Paper/Paper'
import Buttons from '../../Component/StudentUpdates/Buttons/Buttons'
import axios from '../../axios'
import SnackBar from '../../Component/MUI/snackbar/snackbar'
import { Typography } from '@material-ui/core';


   class StudentUpdates extends Component {
       state = {
           modalEventName: '',
        columns: [
            { field: 'rollNumber', headerName: 'Roll Number', width: 140 },
            { field: 'name', headerName: 'Name', width: 180 },
            { field: 'currentSemester', headerName: 'Semester', width: 120 },
            {
              field: 'phoneNumber',
              headerName: 'Phone Number',
              sortable: false,
              width: 150,
            },{
                field: 'branch', headerName: 'Branch', width: 290
            }
          ],
          selectedData: [],
          selectedID: [],
          tableData: [],
          selectedBranch: '',
          branches : [],
          contentFailed: false,
          errorMessage: "",
          type:"error"
       }

       
       componentDidMount(){
        if(this.state.branches.length === 0){
            axios.get('/api/admin/detailStudent/branches', {withCredentials:true}).then(res => {
                let branchesUpdated = [...this.state.branches]
                branchesUpdated = res.data.branches
                this.setState({branches:branchesUpdated })
            }).catch(err => {
                this.setState({contentFailed: true, errorMessage: err.errorMessage})
                setTimeout(()=>{
                    this.setState({contentFailed: false, errorMessage: ''})
                }, 3200)
            })
           
            }
        }

        onBranchChangeHandler = (event) => {
            axios.get('/api/admin/student/students', {withCredentials:true, params:{branch: event.target.textContent}})
            .then(res => {
                let dataUpdate = [...this.state.tableData]
                dataUpdate = res.data.students.map(student => {
                    student.id = student.rollNumber
                    return student
                })
                this.setState({tableData:dataUpdate, selectedBranch:event.target.textContent })
            }).catch(err => {
                this.setState({contentFailed: true, errorMessage: err.errorMessage})
                setTimeout(()=>{
                    this.setState({contentFailed: false, errorMessage: ''})
                }, 3200)
            })
           
        }


        selectAll = (e) => {
           const isSelected = document.querySelector('[aria-label="Select All Rows checkbox"]').checked
           let selectedRows = [...this.state.selectedData]
           let selectedID = [...this.state.selectedID] 
           if(isSelected){
                selectedID = e.api.getAllRowIds()
                selectedRows = [...this.state.tableData]
            }else{
                selectedID = []
                selectedRows = []
            }
            this.setState({selectedData: selectedRows,selectedID:selectedID })
        }

       onSelectRowHandler = (row) => {
            let selectedRows = [...this.state.selectedData]
            let selectedID = [...this.state.selectedID]
            if(row.isSelected === true){
                selectedRows.push(row.data)
                selectedID.push(row.data.id)
            }
            if(row.isSelected === false){
                selectedRows = selectedRows.filter(sRow => row.data.rollNumber !== sRow.rollNumber )
                selectedID = selectedID.filter(id => id !== row.data.id)
            }
            this.setState({selectedData: selectedRows, selectedID:selectedID})
        }

       onModalOpenHandler = (target) => {
           this.setState({ modalEventName: target })
       }

       onModalCloseHandler = () => {
           this.setState({modalEventName: ''})
       }

       onSuccess = (message) => {
        this.setState({contentFailed: true, errorMessage: message, type: "success"})
        setTimeout(()=>{
            this.setState({contentFailed: false, errorMessage: '', type: "error"})
        }, 3200)
       }

       onError = (message) => {
        this.setState({contentFailed: true, errorMessage: message, type: "error"})
        setTimeout(()=>{
            this.setState({contentFailed: false, errorMessage: '', type: "error"})
        }, 3200)
       }


       onDeleteBatch = () => {
           axios.delete('/api/admin/student/batch', {
               withCredentials: true,
               data: {batch: this.state.selectedBranch}
            } )
           .then(res => {
                if(res.data.success === true){
                    let branchesUpdated = [...this.state.branches]
                    branchesUpdated = branchesUpdated.filter(branch => branch !== res.data.batch )
                    this.setState({contentFailed: true, errorMessage: `Branch ${res.data.batch} deleted successfully`, type: "success", modalEventName: '', tableData: [], branches: branchesUpdated})
                    setTimeout(()=>{
                        this.setState({contentFailed: false, errorMessage: '', type:'error'})
                    }, 3200)
                }
           })
           .catch(err => {
            this.setState({contentFailed: true, errorMessage: err.errorMessage, modalEventName:''})
            setTimeout(()=>{
                this.setState({contentFailed: false, errorMessage: ''})
            }, 3200)
           })
       }

       onDeleteStudent = () => {
           axios.delete('/api/admin/student/',{
            withCredentials: true,
            data: {students: [...this.state.selectedID]}
         }).then(res => {
            if(res.data.success === true){
                this.setState({contentFailed: true, errorMessage: `Students deleted successfully`, type: "success", modalEventName: '', tableData: []})
                setTimeout(()=>{
                    this.setState({contentFailed: false, errorMessage: '', type:'error'})
                }, 3200)
            }
       })
       .catch(err => {
        this.setState({contentFailed: true, errorMessage: err.errorMessage, modalEventName:''})
        setTimeout(()=>{
            this.setState({contentFailed: false, errorMessage: ''})
        }, 3200)
       })
       }

        onPassHold = (event) => {
            let toDo = "pass"   
            if(event === "hold"){
                toDo = "hold"
            }
            axios.patch('/api/admin/student/passHold',{students: [...this.state.selectedID], type: toDo},{withCredentials: true}).then(res => {
                if(res.data.success === true){
                    this.setState({contentFailed: true, errorMessage: `${res.data.type} successfully`, type: "success", modalEventName: '', tableData: []})
                    setTimeout(()=>{
                        this.setState({contentFailed: false, errorMessage: '', type:'error'})
                    }, 3200)
                }
           })
           .catch(err => {
            this.setState({contentFailed: true, errorMessage: err.errorMessage, modalEventName:''})
            setTimeout(()=>{
                this.setState({contentFailed: false, errorMessage: ''})
            }, 3200)
           })
        }

        onIncreaseSemester = () => {
            axios.patch('/api/admin/student/incSem',{},{withCredentials: true}).then(res => {
                if(res.data.success === true){
                    this.setState({contentFailed: true, errorMessage: `semester increased successfully`, type: "success", modalEventName: ''})
                    setTimeout(()=>{
                        this.setState({contentFailed: false, errorMessage: '', type:'error'})
                    }, 3200)
                }
           })
           .catch(err => {
            this.setState({contentFailed: true, errorMessage: err.errorMessage, modalEventName:''})
            setTimeout(()=>{
                this.setState({contentFailed: false, errorMessage: ''})
            }, 3200)
           })
        }

        onPasswordReset = (rollNumber) => {
            axios.patch('/api/admin/student/resetPwdStudent',{rollNumber: rollNumber},{withCredentials: true}).then(res => {
                if(res.data.success === true){
                    this.setState({contentFailed: true, errorMessage: `Password changed successfully`, type: "success", modalEventName: ''})
                    setTimeout(()=>{
                        this.setState({contentFailed: false, errorMessage: '', type:'error'})
                    }, 3200)
                }
           })
           .catch(err => {
            this.setState({contentFailed: true, errorMessage: err.errorMessage, modalEventName:''})
            setTimeout(()=>{
                this.setState({contentFailed: false, errorMessage: ''})
            }, 3200)
           })
        }

   render(){

    const paperStyle={
        borderRadius: '20px',
        minHeight: '80vh',
        padding: 20
    }

       return (
           <React.Fragment>
            <Buttons 
                branches={this.state.branches} 
                branchChange={this.onBranchChangeHandler}
                modalName={this.state.modalEventName} 
                onModalOpen={this.onModalOpenHandler} 
                onModalClose={this.onModalCloseHandler} 
                selectedData={this.state.selectedData}
                branch={this.state.selectedBranch}
                tableData={this.state.tableData}
                success ={this.onSuccess}
                error={this.onError}
                deleteBatch={this.onDeleteBatch}
                deleteStudent={this.onDeleteStudent}
                passHold = {this.onPassHold}
                incSem={this.onIncreaseSemester}
                changePassword={this.onPasswordReset}
                />
            <Paper extraStyles={paperStyle}>
            {this.state.selectedBranch ? <Typography gutterBottom variant="h5" align="center">{this.state.selectedBranch}</Typography> : null}
            <DataGrid selectAll={this.selectAll} colums={this.state.columns} data={this.state.tableData} select={this.onSelectRowHandler}/>
            </Paper>
            {this.state.contentFailed ? <SnackBar message={this.state.errorMessage} type={this.state.type} /> : null}
            </React.Fragment>
       )
   }
}

export default StudentUpdates