/* 
    Description : This Component creates a list of notices.
    TODO: GET notices from backend
    DEFAULT_NAMED_NOTE: Docs import it as Accordion, But I imported it as CustomizedAccordion
*/

import classes from './Notice.module.css';
import React from 'react';
import CustomizedAccordion from '../../MUI/Accordions/CustomizedAccordion'
import Typography from '../../MUI/Typography/Typography'

const Notices = (props) => {

    const notices = props.notices.map((notice,index)=> {
       return(<CustomizedAccordion key={index} panel={index} heading={notice.title || "Empty title"} description={notice.desc || "Empty description"} />) 
    })

    const TypographyHeading={variant: "h5" , align:"center"}

    return(
        <div className={classes.Notice}>
        <Typography styles={TypographyHeading}>Current  Notices</Typography>
        <ul className={classes.List}>
        {notices}
        </ul>
        </div>
    )
}

export default Notices