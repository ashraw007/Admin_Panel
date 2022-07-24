import React from 'react';
import Modal from '../../MUI/Modal/Modal'
import Select from '../../MUI/Select/Select'
import TextField from '@material-ui/core/TextField';
import Button from  '@material-ui/core/Button';
import classes from './SearchSort.module.css'


   const SearchSort = (props) => {
    const branch = {
        title: 'Branch',
        id:'branch',
        options: [
            {value: 'Computer Engineering', text: 'Computer Science'},
            {value: 'Automobile Engineering', text: ' AutoMobile'},
            {value: 'Electronics and Communication Engineering', text: 'Electrical & Communication'},
        ]
    }

    const semester = {
        title: 'Semester',
        id:'semester',
        options: [
            {value: 1, text: 'Semester One'},
            {value: 2, text: 'Semester Two'},
            {value: 3, text: 'Semester Three'},
            {value: 4, text: 'Semester Four'},
            {value: 5, text: 'Semester Five'},
            {value: 6, text: 'Semester Six'},
            {value: 7, text: 'Semester Seven'},
            {value: 8, text: 'Semester Eight'},
            {value: 9, text: 'Semester Nine'},
            {value: 10, text: 'Semester Ten'},
        ]
    }

    return (
        <Modal modalState={props.modal} onModalOpen={props.onModalOpen} onModalClose={props.onModalClose} heading="Search & Sort" extraStyles={{width: '100%', flexDirection: 'column'}}>
        <TextField id="rollNumber" value={props.values.rolNumber}  label="Roll Numbers" type="Number" onChange={(event) => props.inputHandler(event) } fullWidth />
        <Select clicked={props.selectHandler} {...branch} value={props.values.branch}/>
        <Select clicked={props.selectHandler} {...semester} value={props.values.semester}/>
        <div className={classes.Bottons}>
        <Button variant="contained" color="primary" disableElevation onClick={props.sort}>
            Sort
        </Button>
        <Button variant="contained" color="primary" disableElevation onClick={props.search}>
            Search
        </Button>
        </div>
        </Modal>
    )
    }

export default SearchSort