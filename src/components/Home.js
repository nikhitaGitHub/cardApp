import {useState, useEffect, useContext} from 'react'
import React from 'react';
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import CardInfo from './CardInfo.js'
import Nav from './Nav.js'
import { Typography } from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@material-ui/core/Container';

const Home = () => {
    //Turn into redux /reducer
    const [values, setValues] = useState(null)
    const [total, setTotal] = useState(0)
    const [count, setCount] = useState(0)
    const authCtx = useContext(AuthContext);
    var id = localStorage.getItem('uid')
    //Navigator to handle button click request of creating a new blog
    const navigate = useNavigate();

    const addCard = () => {
        navigate('/add-card')
    }

    //On every time we land on the home page, start fetching data 
    useEffect(() => {
        fetchData();
    },[]);

    //Fetches data for all users 
    const fetchData = async () => {
        //GET request by default 
        const resp = await fetch(`https://bhumiotest-default-rtdb.firebaseio.com/cards/${id}.json`)
        const data = await resp.json()
        if(!resp.ok) {
            const err = new Error("Unexpected Status:" + resp.status)
            err.data = data;
            err.resp = resp;
            console.log(err)
            throw err;
        }
        else { 
            //Store all user data and display by the newest post first
            if(data !== null) {
                setValues(data)
                Object.keys(data).map((key) => {
                    setCount((prev) => parseInt(prev) + 1)
                    setTotal((prevState) => {
                        return parseInt(prevState) + data[key]["budget"]
                    })
                })
            }
            else {
                setTotal(0)
            }
        }
    }

    //JSX to display already created and added cards
    return (
    <React.Fragment>
        <Nav/>
        {
            values !== null
            ?
            <Container align="center" maxWidth="lg">
                <Typography sx={{mt:8, py: 3, px: 3}} variant="h5" align="center" style={{color:"#FFF", backgroundColor:"#4076D2", borderRadius: 10}}>
                    Total Projects = {count}, Total Budget = {total}
                </Typography>
                <Grid style={{justifyContent:"space-between"}} container direction="row">
                {
                    Object.keys(values).map((k, index) => 
                        (<CardInfo key={index} obj={values[k]} uid={k}/>)
                    )
                }
                </Grid>
            </Container>
            :
            <Container align="left" maxWidth="md" >
                <Alert  sx={{mt: '30%'}} style={{wordWrap: 'break-word'}} severity="info">
                <AlertTitle>Info</AlertTitle>
                You do not have any cards added at the moment ! Please click Add Card button to add a card </Alert>
            </Container>
            }
            
    </React.Fragment>
    )
}

export default Home