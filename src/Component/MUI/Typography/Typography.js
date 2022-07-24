/* 
    Description: this element contains the text that has to be displayed, Created with the help of material UI
    DOCS: https://material-ui.com/Components/typography/
    DEFAULT_NAMED_NOTE: Docs import it as Typography, But I imported it as Text, so I could use (var=>) Typography in export
*/

import React from 'react';
import Text from '@material-ui/core/Typography'; 
import PropTypes from 'prop-types';

const Typography = (props) => (
    <Text {...props.styles} style={props.style} >{props.children}</Text>
)

Typography.propTypes = {
    styles: PropTypes.object,
    children: PropTypes.string
}


export default  Typography