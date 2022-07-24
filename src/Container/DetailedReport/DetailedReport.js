import React, { Component } from 'react';
import ReportControls from '../../Component/DeatiledReport/ReportControls/ReportControls'
import Typography from '../../Component/MUI/Typography/Typography'
import DataGrid from '../../Component/MUI/DataGrid/DataGridWithoutSelect'
import Paper from '../../Component/MUI/Paper/Paper'
import axios from '../../axios'
import SnackBar from '../../Component/MUI/snackbar/snackbar'

   class DetailedReport extends Component {
       state = {
        columns: [
            { field: 'rollNumber', headerName: 'Roll Number', width: 140 },
            { field: 'name', headerName: 'Name', width: 180 },
            { field: 'currentSemester', headerName: 'Semester', width: 120 },
            { field: 'isLateralEntry', headerName: 'Is Lateral', width: 140 },
            {
              field: 'phoneNumber',
              headerName: 'Phone Number',
              sortable: false,
              width: 150,
            },
            {field: 'email', headerName: 'Email', width: 280},
            {field: 'for', headerName: 'Receipts', width: 300 }
          ],
        branches : [],
        selectedBranch: '',
        tableData: [],
        contentFailed: false,
        errorMessage: ""
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


        onChangeHandler = (event) => {
            axios.get('/api/admin/detailStudent/students',{
                withCredentials: true,
                params: {
                    branch: event.target.textContent
                }
            })
            .then(res => {
                res.data.students = res.data.students.map(student => { 
                    let ids = ""
                    if(student.receipts.length > 0) {
                        ids = student.receipts.map(receipt => receipt.receiptID)
                        if(ids.length > 0){
                           ids = ids.join(",")
                        }
                    }else{
                        ids = ""
                    }
                        return  {...student, id: student.rollNumber,for: ids}})
                this.setState({tableData: res.data.students, selectedBranch: event.target.textContent})
            }).catch(err=>{
                console.log(err)
                this.setState({contentFailed: true, errorMessage: err.errorMessage})
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

    const TypographyHeadingStyles = {variant:"h2", align:"center"}
    const TypographyTableHeadingStyles = {variant:"h5", align:"center", gutterBottom:true}
       return (
           <React.Fragment>
           <Typography styles={TypographyHeadingStyles}>Detailed Report</Typography>
           <ReportControls branches={this.state.branches} onChange={this.onChangeHandler}/>
           <Paper extraStyles={paperStyle}>
           <Typography styles={TypographyTableHeadingStyles}>{this.state.selectedBranch === '' ? `No branch Selected` : this.state.selectedBranch }</Typography>
           <DataGrid data={this.state.tableData} colums={this.state.columns} />
           </Paper>
           {this.state.contentFailed ? <SnackBar message={this.state.errorMessage} type="error" /> : null} 
           </React.Fragment>
       )
   }
}

export default DetailedReport