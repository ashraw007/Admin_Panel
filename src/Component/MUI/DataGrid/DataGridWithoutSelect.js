import React from 'react';
import {
    DataGrid,
    GridToolbar,
  } from '@material-ui/data-grid';



const MUIDataGrid = (props) => {
    const columns = props.colums
      
      const rows = props.data;


      return(
        <div style={{ height: '100%', width: '100%' }}>
            <DataGrid 
            rows={rows} 
            columns={columns} 
            checkboxSelection={true}
            localeText={{
                toolbarDensity: 'Size',
                toolbarDensityLabel: 'Size',
                toolbarDensityCompact: 'Small',
                toolbarDensityStandard: 'Medium',
                toolbarDensityComfortable: 'Large',
              }}
              components={{
                Toolbar: GridToolbar,
              }}
            />
        </div>
      )
   }

export default MUIDataGrid