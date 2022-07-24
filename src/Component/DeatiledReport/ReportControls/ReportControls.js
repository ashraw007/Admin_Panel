import React from 'react';
import Drawer from '../../MUI/Drawer/Drawer'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import {useState} from 'react'
import classes from './ReportControls.module.css'

   const ReportControl = (props) => {

    const [open, toggleDrawer] = useState(false)

        return (
            <div className={classes.ReportControls}>
            <Button variant="contained"  color="primary" onClick={()=>toggleDrawer({open: true})}>Branches</Button>
                <Drawer drawerSide="right" isOpen={open} closeHandler={() => toggleDrawer(!open)} >
                    {props.branches.map( branch => 
                        <ListItem key={branch} button onClick={(event) => {props.onChange(event) }}>
                        <ListItemText primary={branch} />
                      </ListItem>
                    )}
                </Drawer>
            </div>      
        )
    }

export default ReportControl