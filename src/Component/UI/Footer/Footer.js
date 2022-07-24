import React from 'react';
import classes from './Footer.module.css'
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';


const Footer = (props) => {
    return(
    <BottomNavigation className={classes.Footer}>
            <div className={classes.MadeBy}>
                <Typography align="center">Made by</Typography>
                <Typography align="center">  <a  className={`${classes.Links}, ${classes.Names}`} rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/ashish-rawat-2226a7197/">Ashish Singh Rawat </a> & <a className={`${classes.Links}, ${classes.Names}`} rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/garvitvij/">Garvit Vij</a></Typography>
                </div>
        </BottomNavigation>
        )
    }

export default Footer