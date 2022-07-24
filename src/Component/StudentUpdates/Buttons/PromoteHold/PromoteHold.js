import React from 'react';
import Typography from '../../../MUI/Typography/Typography'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classes from '../BasicStyles.module.css'


   const PromoteHold = (props) => {
    let visibleComponent = <div> <Typography>No students were selected</Typography> <div className={classes.Center}> <Button variant="contained" className={classes.Safe}  onClick={props.close}>Cancle</Button></div></div>

    if(props.students.length > 0) {
        visibleComponent = 
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Roll Number</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Branch</TableCell>
                            <TableCell align="right">Semester</TableCell>
                        </TableRow>
                    </TableHead>
                <TableBody>
                {props.students.map((student) => (
                    <TableRow key={student.rollNumber}>
                      <TableCell component="th" scope="row">
                        {student.rollNumber}
                      </TableCell>
                      <TableCell align="right">{student.name}</TableCell>
                      <TableCell align="right">{student.batch}</TableCell>
                      <TableCell align="right">{student.currentSemester}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Typography styles={{align:'center'}} style={{margin: '1%'}}>(* A student can only be held, if they have pending backlogs.<br/> Promoting Students after 6 will result in deleting of their ids)</Typography>
        <div className={classes.Center}>
        <Button variant="contained" className={classes.Promote} onClick={()=>props.passHold("pass")}>Promote</Button>
        <Button variant="contained" className={classes.Danger} onClick={()=>props.passHold("hold")}>Hold</Button>
        <Button variant="contained" className={classes.Safe}  onClick={props.close}>Cancle</Button>
        </div>
        </div>
    }

    return visibleComponent
   }

export default PromoteHold