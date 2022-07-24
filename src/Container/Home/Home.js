/*  
    Description: HOME CONTAINER, PROVIDES DATA TO EVERY HOME COMPONENT.
    TODO: INTREACT WITH REDUX, CLEAN UP OF STATE WITH REDUX AND POSSIBLY MAKE IT SMALL.
*/

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '../../Component/MUI/Paper/Paper';
import Chart from '../../Component/Home/Charts/Chart'
import Notices from '../../Component/Home/Notices/Notices'
import YearlyData from '../../Component/Home/YearlyData/YearlyData'
import axios from '../../axios'
import SnackBar from '../../Component/MUI/snackbar/snackbar'

class Home extends Component {
    state = {
        fetched: false,
        contentFailed: false,
        errorMessage: "",
        chartOne: {
            series:[0,0,0],
            options:{
                labels: ['Paid the fee', 'Updated Subjects', 'Not Logged in'],
                legend:{
                    position:"right"
                },
                colors: ["#1976d2","#388e3c", "#f57c00"]
                }
        },
        chartTwo:{
            series:[0,0,0],
            options:{
                labels: ['C S','A M ','E & C'],
                legend:{
                    position:"right"
                },
                colors: ["#1976d2","#388e3c", "#f57c00" ]
                } 
        },
        chartThree:{
            series: [
                {name: "Computer Engineering",data: [0,0,0]},
                {name: "Automobile engineering",data: [0,0,0]},
                {name: "Electronics and Communication Engineering",data: [0,0,0]},
                {name: "Back",data: [0,0,0,0]},
            ],
            options:{
                chart:{
                    type:"bar",
                    height:200,
                    stacked: true
                },
                plotOptions: {
                    bar: {
                        horizontal: true
                    }
                },
                stroke:{
                    width: 1
                },
                xaxis: {
                    categories: ["Year 1", "year 2", "year 3", "Back"]
                },
                legend:{
                    position:"top"
                },
                colors: ["#1976d2","#388e3c","#f57c00","#33aaff"]
            }
        },
        Yearlydata: [
            {
                year: "Year 1",
                batch: "2021-2022",
                branches: [
                    {
                        branch: "Computer Engineering",
                        total: 0,
                        paid: 0
                    },
                    {
                        branch: "Automobile Engineering",
                        total: 0,
                        paid: 0
                    },
                    {
                        branch: "Electronics and Communication Engineering",
                        total: 0,
                        paid: 0
                    }
                ]
            },
            {
                year: "Year 2",
                batch: "2022-2023",
                branches: [
                    {
                        branch: "Computer Engineering",
                        total: 0,
                        paid: 0
                    },
                    {
                        branch: "Automobile Engineering",
                        total: 0,
                        paid: 0
                    },
                    {
                        branch: "Electronics and Communication Engineering",
                        total: 0,
                        paid: 0
                    }
                ]
            },
            {
                year: "Year 3",
                batch: "2023-2024",
                branches: [
                    {
                        branch: "Computer Engineering",
                        total: 0,
                        paid: 0
                    },
                    {
                        branch: "Automobile Engineering",
                        total: 0,
                        paid: 0
                    },
                    {
                        branch: "Electronics and Communication Engineering",
                        total: 0,
                        paid: 0
                    }
                ]
            }
        ],
        notices: []

    }

    componentDidMount(){
        if(this.state.fetched === false){
            axios.get('/api/admin/home/', {withCredentials : true}).then(res => {
                
                // Charts
                let chartOneCopy = {...this.state.chartOne}
                chartOneCopy.series = [...this.state.chartOne.series]
                chartOneCopy.series = res.data.chartOne
                let chartTwoCopy = {...this.state.chartTwo}
                chartTwoCopy.series = [...this.state.chartThree.series]
                chartTwoCopy.series = res.data.chartTwo
                let chartThreeCopy = {...this.state.chartThree}
                chartThreeCopy.series = [...this.state.chartThree.series]
                chartThreeCopy.series = res.data.chartThree
                
                //Accordion
                let YearlyDataCopy = [...this.state.Yearlydata]
                YearlyDataCopy = res.data.accordionData

                //notices
                let noticesCopy = [...this.state.notices]
                noticesCopy = res.data.notices


                this.setState(
                    {fetched: true, 
                        chartOne: chartOneCopy, 
                        chartTwo: chartTwoCopy, 
                        chartThree: chartThreeCopy,
                        Yearlydata: YearlyDataCopy,
                        notices: noticesCopy
                    })
            }).catch(err => {
                this.setState({contentFailed: true, errorMessage: err.errorMessage})
                setTimeout(()=>{
                    this.setState({contentFailed: false, errorMessage: ''})
                }, 3200)
            })
        }

    }

    
    render(){
        const paperStyle={
            border:'2px solid black',
            boxShadow: '10px 10px 4px rgba(0, 0, 0, 0.5)',
            borderRadius: '40px',
            height: '100%',
            padding: 20
        }
        
        const yearlyDataElement = this.state.Yearlydata.map(yearData => (
            <Grid item md={4} xs={12}  key={yearData.year}>
                <Paper extraStyles={paperStyle} elevation={2} bgcolor="white">  
                <YearlyData year={yearData.year} batch={yearData.batch} branches={yearData.branches} />
                </Paper>
            </Grid>
        ))

        return (
        <div>
            <Grid justify="space-between" alignItems="center" container spacing={3}>
              <Grid item xs={12} lg={6}>
                <Paper extraStyles={paperStyle} elevation={2} bgcolor="white">
                    <Chart options={this.state.chartOne.options} heading="Student who" series={this.state.chartOne.series} type="pie" height={200} />
                </Paper>
              </Grid>
              <Grid  item xs={12} lg={6}>
              <Paper extraStyles={paperStyle} elevation={2} bgcolor="white">
                  <Chart options={this.state.chartTwo.options} heading="Fees paid by each branch" series={this.state.chartTwo.series} type="donut" height={200} />
              </Paper>
            </Grid>
           
            </Grid>
            <Grid justify="space-between" alignItems="center" container spacing={3}>
            <Grid item xs={12} >
            <Paper extraStyles={paperStyle} elevation={2} bgcolor="white">
                <Chart options={this.state.chartThree.options} heading="Detailed Report" series={this.state.chartThree.series} type="bar" height={300}  />
            </Paper>
          </Grid>
          </Grid>
            <Grid justify="space-between" alignItems="center" container spacing={3}>
                {yearlyDataElement}
          </Grid>
        <Grid alignItems="center" container spacing={3}>
            <Grid item xs={12}>
                <Paper extraStyles={paperStyle} elevation={2} bgcolor="white">
                    <Notices notices={this.state.notices} />
                </Paper>
            </Grid>
        </Grid>
        {this.state.contentFailed ? <SnackBar message={this.state.errorMessage} type="error" /> : null} 
        </div>
        )
    }
}

export default Home