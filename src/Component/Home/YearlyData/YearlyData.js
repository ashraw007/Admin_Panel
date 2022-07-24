/* 
    Description: This is a basic layout for a yearlyData Summary. 
    It is itrated with an array to create more summary component
    DEFAULT_NAMED_NOTE: Docs import it as Accordion, But I imported it as SimpleAccordion
*/

import React from 'react';
import Typography from '../../MUI/Typography/Typography'
import SimpleAccordion from '../../UI/Accordions/SimpleAccordion'
import classes from "./YearlyData.module.css";
import PropTypes from 'prop-types';

const YearlyData = (props) => {

    //Typography Inline Css
    const typographyHeadingStyle = {variant:"h3", align:"center", gutterBottom:true}
    const typographyBatchStyle = {variant: "body1", align:"center", gutterBottom:true}


    return(
        <div className={classes.YearlyData}>
            <Typography styles={typographyHeadingStyle} >{props.year}</Typography>
            <Typography styles={typographyBatchStyle}>{props.batch}</Typography>
            {props.branches.map(branch => (
                <SimpleAccordion display={{display: "block"}} heading={branch.branch} key={branch.branch}>
                <div className={classes.Flex}>
                    <Typography>{`${branch.paid}/${branch.total}`}</Typography>
                    </div>
                </SimpleAccordion>
            ))}
        </div>

    )
}

YearlyData.propTypes = {
    year: PropTypes.string,
    branch: PropTypes.string,
    branches: PropTypes.array
}

export default YearlyData