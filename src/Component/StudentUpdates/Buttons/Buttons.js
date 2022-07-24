import React from 'react';
import { FilePicker } from 'react-file-picker'
import classes from './Buttons.module.css'
import Modal from '../../MUI/Modal/Modal';
import Button from '@material-ui/core/Button';
import DeleteBatch from './DeleteBatch/DeleteBatch'
import DeleteStudent from './DeleteStudent/DeleteStudent'
import PromoteHold from './PromoteHold/PromoteHold'
import ResetPassword from './ResetPassword/ResetPassword'
import IncreaseSemester from './IncreaseSemester/IncreaseSemester'
import {useState} from 'react'
import Drawer from '../../MUI/Drawer/Drawer'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from '../../../axios'

   const Buttons = (props) => {

    
    const [open, toggleDrawer] = useState(false)
    const [request, toggleRequest] = useState(false)
    const [error, setError] = useState(null)



       return(
        <div className={classes.Buttons}>
        <Button variant="contained" color="primary" onClick={()=>toggleDrawer({open: true})}>
            Semester
        </Button>
        <Drawer drawerSide="right" isOpen={open} closeHandler={() => toggleDrawer(!open)} >
        {props.branches.map( branch => 
            <ListItem button onClick={(event) => props.branchChange(event)}>
            <ListItemText primary={branch} />
          </ListItem>
        )}
    </Drawer>
        <FilePicker
        extensions={['gtbpi']}
        onChange={FileObject => {
            toggleRequest(true)
            const bodyFormData = new FormData();
            bodyFormData.append('data', FileObject)
            axios.post('/api/admin/student', bodyFormData ,{withCredentials: true})
            .then(res => {
                if(res.data.success === true){
                    props.success("Student inserted successfully !")
                    setTimeout(()=>{
                        window.location.reload(false);
                    },2000)
                }
                toggleRequest(false)
            })
            .catch(err => {
                toggleRequest(false)
                setError(err.error.error)
                props.error(err.errorMessage)
            })
        }}
        onError={errMsg => { props.error(errMsg)}}
        >
            <Button variant="contained" color="primary">
                Add Students
            </Button>
        </FilePicker>
        <Modal heading="Delete Batch" modalState={props.modalName === "Delete Batch" ? true : false} onModalOpen={props.onModalOpen} onModalClose={props.onModalClose}><DeleteBatch deleteBatch={props.deleteBatch} batch={props.branch} close={props.onModalClose}/></Modal>
        <Modal heading="Delete student" modalState={props.modalName === "Delete student" ? true : false} onModalOpen={props.onModalOpen} onModalClose={props.onModalClose}><DeleteStudent deleteStudents={props.deleteStudent}  students={props.selectedData} close={props.onModalClose} /></Modal>
        <Modal heading="Promote / Hold" modalState={props.modalName === "Promote / Hold" ? true : false} onModalOpen={props.onModalOpen} onModalClose={props.onModalClose}><PromoteHold passHold={props.passHold} students={props.selectedData} close={props.onModalClose}/></Modal>
        <Modal heading="Increase Semester" modalState={props.modalName === "Increase Semester" ? true : false} onModalOpen={props.onModalOpen} onModalClose={props.onModalClose}><IncreaseSemester incSem={props.incSem} close={props.onModalClose}/></Modal>
        <Modal heading="Change Password" modalState={props.modalName === "Change Password" ? true : false} onModalOpen={props.onModalOpen} onModalClose={props.onModalClose}><ResetPassword changePassword={props.changePassword} close={props.onModalClose}/></Modal>
        {request ? <div className={classes.loading}>
            <div className={classes.loader}></div>
            <h4>Processing , Please wait. this may take a while. </h4>
            <h4> Please donot perfrom any other in between</h4>
            </div> : null}
        {error ? <div className={classes.error}>
                <p>{JSON.stringify(error)}</p>
                <p>Please fix error and rebuild the file</p>
                <Button fullWidth onClick={()=>setError(null)} color="secondary">Close</Button>
            </div> : null}
        </div>
    )}

export default Buttons