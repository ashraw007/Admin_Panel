import React, { Component, Suspense } from 'react';
import './App.css';
import Cookies from 'js-cookie'; 
import Login from './Container/Login/Login'
import Password from './Container/Password/Password';
import ResetPassword from './Container/ResetPassword/ResetPassword'
import FourOFour from './utils/404/FourOFour'
import { Route, Switch } from 'react-router-dom'
import Footer from './Component/UI/Footer/Footer'
const Layout = React.lazy(()=> import("./hoc/Layout/Layout"))

class App extends Component {
    state = {
        isAuthenticated : false
    }

    
    checkValidity = () => {
        if(Cookies.get('token')){
            this.setState({isAuthenticated: true})
        }
    }

    componentDidMount(){
        if(Cookies.get('token')){
            this.setState({isAuthenticated: true})
        }
    }


   render(){
       let route = (
           <Switch>
                <Route exact path="/reset-password/:id" component={ResetPassword} />
                <Route exact path="/forgot-password" component={Password}/>
                <Route exact path="/" render={()=><Login refresh={this.checkValidity}/ >}/>
                <Route component={FourOFour} />
           </Switch>
       )

        if(this.state.isAuthenticated){
            route =
            <Suspense fallback={<div>Loading...</div>}>
            <Layout />
            </Suspense>
        }


       return (
                <div>
                    {route}
                    {this.state.isAuthenticated ? null : <Route component={Footer} /> } 
                </div>
           )
   }
}

export default App;
