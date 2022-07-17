import {useRef, useState, useContext} from 'react'
import React from 'react'
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Box } from '@mui/material';
import { Typography, Button, ButtonGroup} from '@mui/material';
import { TextField } from '@mui/material';
import Link from '@mui/material/Link';

const AuthPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const emailRef = useRef();
    const passwordRef = useRef();
    const authCtx = useContext(AuthContext);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const [alerting, setAlerting] = useState(false)
      
    //Allows user to log into their account
    const logInHandler = (event) => {
        //Firebase url for login
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDE4iP825MCMhQdxd4u_weSYArDwkvAlY'
        submitHandler(event, url, 0)
    }

    //Allows user to submut registeration form and show appropriate message
    const submitHandler = (event, url, flag) => {
        event.preventDefault();
        setMsg("Logging In")
        setIsLoading(true)
        //Refs to capture user input 
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        // store email and password in DB or verify it for login
        fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type' : 'application/json'
                }
            }).then(res => {
                setIsLoading(false)
                if(res.ok) {
                    if(flag === 0) {
                        navigate('/home')
                    }
                    else {
                        setAlerting(true)
                    }
                    
                    return res.json();
                }
                //Error handling for incorrect user login
                else {
                    res.json().then(data=> {
                        let errMsg = 'Authentication failed!';
                        if(data && data.error && data.error.message)
                            errMsg = data.error.message
                        alert(errMsg)
                        throw new Error(errMsg);
                    });
                }
            })
            //Finally handle the success case or error case
            .then((data) => {
                if(flag === 0) {
                    if (data === undefined) {
                        authCtx.login('')
                    }
                    else {
                        //For auto logout of user
                        let expTime = new Date(new Date().getTime() + (+data.expiresIn * 1000))
                        authCtx.login(data.idToken, expTime, data.localId);
                    }
                }
            })
            .catch((err) => {     
                alert(err.message)
            })
        }
        // JSX to render sing up and login form 
    return (
            <React.Fragment>
            <Container align="center" maxWidth="sm">
                <Box component="form" onSubmit={submitHandler} noValidate sx={{ width:"65%" , mt: 20, py: 5 }}>
                <TextField
                    inputRef = {emailRef}
                    placeholder="dummy@email.com"
                    type="email"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    autoFocus
                    variant = "outlined"
                />
                <TextField
                    inputRef = {passwordRef}
                    type="password"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    autoFocus
                    variant = "outlined"
                />
                   {!isLoading && <Button sx={{mb:1, mt: 2}} variant="contained" fullWidth size="large" onClick={logInHandler}>Log In</Button> }
                   {!isLoading && <Link href="signup" variant="body2">Don't have an account? Sign Up</Link> }
                {isLoading && <p> {msg} ... !</p>}
                </Box>
            </Container> 
            }
        </React.Fragment>
    )
} 

export default AuthPage;