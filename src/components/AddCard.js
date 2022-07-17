import React from 'react'
import Container from '@material-ui/core/Container';
import { TextField } from '@mui/material';
import {useRef, useContext, useState} from 'react';
import AuthContext from '../store/auth-context';
import Nav from './Nav.js'
import { Typography, Button } from '@mui/material';
import { Box } from '@mui/material';
import {
    DateTimePicker, MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const AddCard = () => {
    const authCtx = useContext(AuthContext);
    const [value, setValue] = useState('')
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const handleCancel=() => {setOpen(false)}
    var id = localStorage.getItem('uid')
    var nameRef = useRef(null);
    var budgetRef = useRef(null);
    var dateRef = useRef(null);

    const handleModalOpen = (event) => {
        event.preventDefault()
        setOpen(true)
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        var req = 'POST' //request method

        //url to send the request to
        var url = `https://bhumiotest-default-rtdb.firebaseio.com/cards/${id}.json`;
        //This is the payload
    
        var reqData = {
            name: nameRef.current.value,
            budget: parseInt(budgetRef.current.value),
            endDate: dateRef.current.value
        }

        nameRef.current.value= ""
        budgetRef.current.value = ""
        dateRef.current.value = ""

        //Sending request to the server
        const resp = await fetch(
        url,
        {
            method: req,
            body: JSON.stringify(reqData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //Error handling
        const data = await resp.json()
        if(!resp.ok) {
            const err = new Error("Unexpected Status:" + resp.status)
            err.data = data;
            err.resp = resp;
            throw err;
        }
        else {
            handleCancel()
            navigate('/home')
        }
    }

return (
    <React.Fragment>
        <Nav/>
        <Container align="center" maxWidth="sm" sx={{py: 15}}>
            <Typography sx={{my: 5}} variant="h6" align="center">Please fill in the details to create your card</Typography>
            <Box component="form" onSubmit={handleModalOpen} noValidate sx={{ mt: 1 }}>
                <TextField
                    inputRef = {nameRef}
                    margin="normal"
                    required
                    fullWidth
                    placeholder="Please enter a name"
                    id="name"
                    name="name"
                    label="Card Name"
                    autoFocus
                    variant="standard"
                />
                <TextField
                    inputRef = {budgetRef}
                    margin="normal"
                    required
                    fullWidth
                    placeholder="Please enter budget value "
                    id="budget"
                    name="budget"
                    label="Project Budget"
                
                    autoFocus
                    variant="standard"
                />
                  <TextField
                    inputRef = {dateRef}
                    margin="normal"
                    required
                    fullWidth
                    id="endDate"
                    name="endDate"
                    autoFocus
                    sx={{ mt: 3 }}
                    type="datetime-local"
                    variant="standard"
                /> 
                <Button type="submit" fullWidth  size="large" sx={{my:3}} variant="contained">Submit</Button>
            </Box>
        </Container>
        <Modal style={{marginTop: "16%", textAlign:"center"}} show={open} onHide={handleCancel}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to submit this card info?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCancel} variant="secondary">Close</Button>
                <Button onClick={handleSubmit} variant="primary">Continue</Button>
            </Modal.Footer>
        </Modal>
    </React.Fragment>
    )
}

export default AddCard;
