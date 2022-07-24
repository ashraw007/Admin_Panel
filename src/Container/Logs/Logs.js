import React, { Component } from 'react';
import Typography from '../../Component/MUI/Typography/Typography';
import LogsList from '../../Component/Logs/LogsList'
import LogControls from '../../Component/Logs/LogControls/LogControls'
import axios from '../../axios'
import SnackBar from '../../Component/MUI/snackbar/snackbar'
import moment from 'moment'

class Logs extends Component {

        state = {
            logs:[],
            filteredLogs: [],
            adminFilter: [],
            statusCodeFilter: [],
            operationFilter: [],
            filters: {
                byCode: '',
                byAdmin: '',
                byTask: '',
            },
            timestamps:{
                from: 0,
                to: 0
            },
            modal: false,
            contentFailed: false,
            errorMessage: "",
    }

    onModalOpenHandler = () => {
        this.setState({modal: true})
    }

    onModalCloseHandler = () => {
        this.setState({modal:false})
    }

    onFilterChangeHandler = (id,value) => {
        const updateFilter = {...this.state.filters}
        updateFilter[id] = value
        this.setState({filters: updateFilter}) 
    }

    onTimestampChangeHandler = (date,id) => {
        const updatedTimestamps = {...this.state.timestamps}
        updatedTimestamps[id] = date ? new Date(date._d).getTime() : 0
        this.setState({timestamps: updatedTimestamps})
    }

    onSort = () => {
        let filteredLogs = this.state.logs
            .filter(log => log.statusCode ===  (this.state.filters.byCode !== '' ? this.state.filters.byCode : log.statusCode))
            .filter(log => log.operationName === (this.state.filters.byTask !== '' ? this.state.filters.byTask : log.operationName))
            .filter(log => log.by === (this.state.filters.byAdmin !== '' ? this.state.filters.byAdmin : log.by))
            .filter(log => log.created_at >= this.state.timestamps.from && log.created_at <= (this.state.timestamps.to === 0 ? new Date():this.state.timestamps.to))
            this.setState({filteredLogs: filteredLogs, modal: false})
    }

    onSearch = () => {
        axios.get('/api/admin/logs/',{
            withCredentials: true,
            params: {
                filters: {
                    ...this.state.filters,
                    ...this.state.timestamps
                }
            }
        }).then(res => {
            let logs = [...this.state.logs]
            logs = res.data.logs
            let adminFilter = [...this.state.adminFilter] 
            adminFilter = res.data.admins
            let statusCodeFilter = [...this.state.statusCodeFilter]
            statusCodeFilter = res.data.statusCode
            let operationFilter = [...this.state.operationFilter]
            operationFilter = res.data.operationName
            this.setState({logs: logs, adminFilter: adminFilter, statusCodeFilter: statusCodeFilter, operationFilter: operationFilter })
        }).catch(err=>{
            this.setState({contentFailed: true, errorMessage: err.errorMessage})
            setTimeout(()=>{
                this.setState({contentFailed: false, errorMessage: ''})
            }, 3200)
        })
        this.setState({modal: false})
    }

    componentDidMount(){
        axios.get('/api/admin/logs/',{withCredentials: true,params: {
            filters: {
                ...this.state.filters,
                ...this.state.timestamps
            }
        }})
        .then(res => {
            let logs = [...this.state.logs]
            logs = res.data.logs.map(log => { return {...log, created_at : new Date(moment(log.createdAt)._d).getTime()}})
            let adminFilter = [...this.state.adminFilter] 
            adminFilter = res.data.admins
            let statusCodeFilter = [...this.state.statusCodeFilter]
            statusCodeFilter = res.data.statusCode
            let operationFilter = [...this.state.operationFilter]
            operationFilter = res.data.operationName
            this.setState({logs: logs, adminFilter: adminFilter, statusCodeFilter: statusCodeFilter, operationFilter: operationFilter })
        }).catch(err=>{
            this.setState({contentFailed: true, errorMessage: err.errorMessage})
            setTimeout(()=>{
                this.setState({contentFailed: false, errorMessage: ''})
            }, 3200)
        })
    }

    render(){

        //Typography inline css
        const TypographyHeadingStyles = {variant:"h2", align:"center"}

        return (
            <React.Fragment>
                <Typography styles={TypographyHeadingStyles}>Logs</Typography>
                <LogControls 
                    admins={this.state.adminFilter}
                    statusCode={this.state.statusCodeFilter}
                    operation={this.state.operationFilter}
                    filterHandler={this.onFilterChangeHandler}
                    selectDefaultValues={this.state.filters}
                    timeHandler={this.onTimestampChangeHandler}
                    timeDefaultValues={this.state.timestamps} 
                    modal = { this.state.modal }
                    onModalOpen={this.onModalOpenHandler}
                    onModalClose={this.onModalCloseHandler}
                    minDate={this.state.timestamps.from}
                    onSort={this.onSort}
                    isToDisable={this.state.isToDisable}
                    onSearch={this.onSearch}
                />
                <LogsList logs={this.state.filteredLogs.length === 0 ? this.state.logs : this.state.filteredLogs} />
                {this.state.contentFailed ? <SnackBar message={this.state.errorMessage} type="error" /> : null} 
                </React.Fragment>
            )
    }
}

export default Logs