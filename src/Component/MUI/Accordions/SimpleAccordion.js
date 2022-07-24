/* 
    Description : Simple Accordion, created with the help of Material ui
    Docs: https://material-ui.com/Components/accordion/
*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '../Typography/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';

const SimpleAccordion = (props) => {
    
    const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: props.height,
        marginBottom:props.marginBottom,
    },
    iconStyles: {
        ...props.iconStyle
    },
    AccordionColor: {
        backgroundColor:theme.palette.primary.light,
        color:theme.palette.secondary.main
    },
    AccordionDeatils:{
        backgroundColor:theme.palette.secondary.main,
        color:theme.palette.secondary.dark,
        ...props.borders,
        ...props.display
    },
    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
          <Accordion className={classes.AccordionColor}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={classes.iconStyles}/>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography styles={props.typographyStyle}>{props.heading}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.AccordionDeatils}>
                {props.children}
            </AccordionDetails>
          </Accordion>
        </div>
      );  
}

SimpleAccordion.propTypes = {
    height: PropTypes.number,
    marginBottom: PropTypes.string,
    iconStyle: PropTypes.object,
    borders: PropTypes.object,
    display: PropTypes.object,
    heading: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element)
}


export default SimpleAccordion