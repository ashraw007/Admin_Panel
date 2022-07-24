/* 
    Description: This component provide custom settings to Material UI Simple Accordion
*/

import React from 'react';
import Accordion from '../../MUI/Accordions/SimpleAccordion'

const SimpleAccordion = (props) => {
    const iconStyles = {color:'White'}
    const borders = {border:'1px solid black', borderTop: 0}
    return(<Accordion
        padding="3%"
        iconStyle={iconStyles}
        heading={props.heading}
        marginBottom="3%"
        borders={borders}
        display={props.display}
    >{props.children}</Accordion>)
}

export default SimpleAccordion