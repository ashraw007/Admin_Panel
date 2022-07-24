import React, {useState, useEffect} from 'react';
import Paper from '../../MUI/Paper/Paper'
import {
    DataGrid,
    GridToolbar,
  } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../../../axios'

const useStyles = makeStyles((theme) => ({
    root: {
      '& ..MuiDataGrid-row.Mui-selected': {
          backgroundColor: 'rgba(33,22,101,0.30)'
      },
    },
    DataGrid: {
        height: '100%',
        width: 'auto'
      }
  }));
  

const ShowReceipts = (props) => {

    const [receipts, setReceipts] = useState([]);
    const [page, setPage] = React.useState(0);

    useEffect(() => {
        (async () => {
            const paged = {}
            paged.start = page * 100
            paged.end = (page + 1) * 100
            axios.get('/api/admin/receipts/', {withCredentials: true, params: {
                paged
            }}).then(res => {
                if(receipts.length !== 0){
                    if(receipts.sort() !== res.data.receipts.sort()){
                        return 0
                    }
                }
                res.data.receipts = res.data.receipts.map(data => {return {...data, id: data.rollNumber}})
                setReceipts(res.data.receipts)
            }).catch(err => {
                console.log(err)
            })
        })();
      });
    
    const classes = useStyles();

    const paperStyle={
        borderRadius: '2px',
        height: '100vh',
        padding: 20,
        margin: '2%'
    }

    const columns = [
        { field: 'rollNumber', headerName: 'Roll Number', width: 130 },
        { field: 'semester', headerName: 'Semester', width: 100 },
        {
          field: 'receiptID',
          headerName: 'Receipt ID',
          width: 200,
        },
        {
          field: 'notes',
          headerName: 'For',
          width: 600
        },
        {field: 'amount', headerName: 'Fee Paid', width: 130}
      ];


    return(
        <Paper extraStyles={paperStyle}>
            <div className={classes.DataGrid}>
                <DataGrid page={page}
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
                onPageChange={(params) => { setPage(params.page)}} className={classes.root} rows={receipts} columns={columns}   pagination showToolbar />
            </div>
        </Paper>
    )
    
}

export default ShowReceipts