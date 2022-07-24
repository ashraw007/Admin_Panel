/* 
    Description : AppBar Component, created with the help of Material ui
    Docs: https://material-ui.com/Components/app-bar/
*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import Avatar from '../Avatar/Avatar';


const MenuAppBar = (props) => {

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        appBarSettings: {
            height: '10vh',
            justifyContent: 'space-between'
        },
        appBarIconSettings: {
            fontSize:'3rem',
            color: theme.palette.secondary.dark
        },
        appBarColor: {
            background: theme.palette.secondary.main
        },ProfileImage:{
            borderRadius: '50%',
            width:"30%",
            right:"2%"
        },
        fixImage:{
            display:'flex',
            justifyContent:'flex-end',
            
        }
      
          }
      ));
      

    const classes = useStyles();

    const profileDefault = (
        <IconButton>
        <Avatar size="7" />
        </IconButton>
    )

     return (
        <div className={classes.root}>
            <AppBar className={classes.appBarColor} position="static">
                <Toolbar className={classes.appBarSettings}>
                    <IconButton onClick={props.drawerOpenhandler} edge="start" className={classes.menuButton}  aria-label="Burger Menu">
                        <MenuIcon className={classes.appBarIconSettings} />
                    </IconButton>
                    <div>
                    <IconButton
                        aria-label="User Profile Picture"
                        aria-controls="profile-picture"
                        aria-haspopup="false"
                    >
                    <div className={classes.fixImage}>
                    {profileDefault}
                </div>
                    </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

MenuAppBar.propTypes  = {
    drawerOpenhandler: PropTypes.func
}

export default MenuAppBar
