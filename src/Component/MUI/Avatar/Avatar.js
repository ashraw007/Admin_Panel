/* 
    Description : Avatar Component[by Default, an icon. if Image Url is given. it would show the image instead], created with the help of Material ui
    Docs: https://material-ui.com/Components/avatars/
*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';

const MUIAvatar = (props) => {
    
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        large: {
          width: theme.spacing( parseInt(props.size) || 10),
          height: theme.spacing( parseInt(props.size) || 10),
          background: theme.palette.secondary.dark,
          color:theme.palette.secondary.main
        },
        center:{
            display:'flex',
            justifyContent:'center',
            margin: '5vh 0'
        }
    }));
    
    const classes = useStyles();


    let Default = (    
        <Avatar className={classes.large}>
            <AccountCircleIcon className={[classes.large , classes.edit]}/>
        </Avatar>
    )
    if(localStorage.getItem("image")){
        Default =<Avatar className={classes.large} src={localStorage.getItem("image")} />
    }

    return (
        <div className={classes.center}>
            <Avatar className={classes.large}>
            {Default}
            </Avatar>
        </div>
    )    
}

export default MUIAvatar