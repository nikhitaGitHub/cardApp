import {useState, useEffect} from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { SettingsInputComponent } from '@material-ui/icons';
import Modal from 'react-bootstrap/Modal';

const CardInfo = (props) => {
    var id = localStorage.getItem('uid')
    const navigate= useNavigate();
    const [open, setOpen] = useState(false)

    const edit = () => {
        navigate('/edit-card', {state:{data:props}})
    }

    const handleCancel =() => {
        setOpen(false)
    }

    const del = async() => {
        var req = 'DELETE' //request method

        //url to send the request to
        var url = `https://bhumiotest-default-rtdb.firebaseio.com/cards/${id}/${props.uid}.json`;
        //This is the payload
    
        var reqData = ''
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
            window.location.reload(true)
        }
    }

    const copy = async() => {
        var req = 'POST' //request method

        //url to send the request to
        var url = `https://bhumiotest-default-rtdb.firebaseio.com/cards/${id}.json`;
        //This is the payload
    
        var reqData = {
            name: props.obj.name,
            budget: props.obj.budget,
            endDate: props.obj.endDate
        }

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
            window.location.reload(true)
        }
    }

    return (
        <React.Fragment>
            <Box align="left" style={{backgroundColor:"#8cc1f7", borderRadius: 16, border: "1px solid blue"}} sx={{mt:5}}>
               <Grid sx={{px: 3, py: 2}} item xs={12}>
                   <Typography sx={{pt: 1}} style={{fontWeight:'500'}} align="left" variant="subtitle1">
                        Card Name: {props.obj.name}
                    </Typography>
                   
                   <Typography sx={{pt: 1}} style={{fontWeight:'500'}} align="left" variant="subtitle1">
                        Project Budget: {props.obj.budget}
                    </Typography>
               
                   <Typography sx={{pt: 1}} style={{fontWeight:'500'}} align="left" variant="subtitle1">
                        Project End Date: {(new Date(props.obj.endDate)).toLocaleString()}
                    </Typography>
                    </Grid>
                    <Divider variant='fullWidth' style={{color:"#f702df", borderWidth:2}}/>
                    <Grid sx={{px: 3}} item xs={24}>
                    <ButtonGroup sx={{py: 1}} variant="text">
                        <Button style={{color:"#000"}} size="small" variant="text" onClick={edit}>Edit Card</Button> 
                        <Button style={{color:"#000"}} size="small" variant="text" onClick={()=>setOpen(true)}>Delete Card</Button>
                        <Button style={{color:"#000"}} size="small" variant="text" onClick={copy}>Copy Card</Button> 
                    </ButtonGroup>
                    </Grid>
            </Box>
            <Modal style={{marginTop: "16%", textAlign:"center"}} show={open} onHide={handleCancel}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this card?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCancel} variant="secondary">Close</Button>
                <Button onClick={del} variant="primary">Continue</Button>
            </Modal.Footer>
        </Modal>
        </React.Fragment>
        )
}

export default CardInfo;