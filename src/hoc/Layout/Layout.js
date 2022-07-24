/* 
    Description : Basic Layout for Each Component, after Login
*/

import React, { Component } from 'react';
import classes from './Layout.module.css'
import AppBar from "../../Component/MUI/AppBar/AppBar";
import Drawer from '../../Component/UI/Drawer/Drawer'
import Paper from '../../Component/MUI/Paper/Paper'
import Home from '../../Container/Home/Home'
import Logs from '../../Container/Logs/Logs'
import Receipts from '../../Container/Receipts/Receipts'
import SiteUpdates from '../../Container/SiteUpdates/SiteUpdates'
import Request from '../../Container/Request/Request'
import DetailedReport from '../../Container/DetailedReport/DetailedReport'
import StudentUpdates from '../../Container/StudentUpdates/StudentUpdates'
import Logout from '../../Container/Logout/Logout'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {Switch, Route} from 'react-router-dom'
import FourOFour from '../../utils/404/FourOFour'

const theme = createMuiTheme({
    typography: {
        "fontFamily": `'Ubuntu', sans-serif;`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
       },
       breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 850,
          lg: 940,
          xl: 1200
        }
      },
      palette: {
          primary: {
              light: '#6B58DF',
              main: '#211665',
              dark: '#0A0528',
          },
          secondary: {
              light: '#f5f5f5',
              main: '#ffffff',
              dark: '#000000'
          },
          transparency: {
              light: 'rgba(255,255,255,0.58)',
              main: 'rgba(255,255,255,0.68)',
              dark: 'rgba(255,255,255,0.88)'
          },
          computerEngineering: {
            light:'#2196f3',
            main: '#1e88e5',
            dark: '#1976d2',
          },
          electricalEngineering: {
            light: '#4caf50',
            main: '#43a047',
            dark: '#388e3c',
          },
          automobileEngineering: {
            light: '#ff9800',
            main: '#fb8c00',
            dark: '#f57c00',
          }
      }
  });


class AdminPanelLayout extends Component {
    
    state = {
        isDrawerOpen: false
    }

    onDrawerOpenHandler = () => {
        this.setState({isDrawerOpen: true})
    }

    onDrawerCloseHandler = () => {
        this.setState({isDrawerOpen: false})
    }

    componentDidMount(){
        if(!localStorage.getItem("image") || localStorage.getItem("image") === "null"){
            const image = prompt("Enter Url for profile picture (optional)", "Some-Image-Url")
            if(image !== "Some-Image-Url"){
            localStorage.setItem("image",image)
            this.setState({imageChanged: true})
            }
        }
    }

   render(){
       return (
        <MuiThemeProvider theme={theme}>
           <div className={classes.Layout}>
                <AppBar drawerOpenhandler={this.onDrawerOpenHandler} />
                <Drawer drawerCloseHandler={this.onDrawerCloseHandler} isDrawerOpen={this.state.isDrawerOpen}/>
                <Paper extraStyles={{minHeight:'86vh'}} bgcolor="rgba(255,255,255,0.88)" elevation={3}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/detailedReport" component={DetailedReport} />
                        <Route exact path="/receipts" component={Receipts} />
                        <Route exact path="/request" component={Request} />
                        <Route exact path="/siteUpdates" component={SiteUpdates} />
                        <Route exact path="/studentUpdates" component={StudentUpdates} />
                        <Route exact path="/logs" component={Logs} />
                        <Route exact path="/logout" component={Logout} />
                        <Route component={FourOFour} />
                    </Switch>
                </Paper>
           </div>
        </MuiThemeProvider>
    )
   }
}

export default AdminPanelLayout