/* 
    Description: This component provide custom settings to Material UI Drawer
*/

import React from 'react';
import MUIDrawer from '../../MUI/Drawer/Drawer'
import Lists from '../Lists/Lists'
import PropTypes from 'prop-types';

const Drawer = (props) => (
    <MUIDrawer
        drawerSide={"left"}
        isOpen={props.isDrawerOpen}
        closeHandler={props.drawerCloseHandler}
    >
    <Lists/>
    </MUIDrawer>
)

Drawer.propTypes = {
    isDrawerOpen: PropTypes.bool,
    drawerCloseHandler: PropTypes.func
}

export default Drawer