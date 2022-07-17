import React from 'react';
import {useContext} from 'react'
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import ToolBar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

const Nav = function () {
    //This is user context storing user login information  
    const authCtx = useContext(AuthContext);
    //Navigator to navigate a user to another page
    const navigate = useNavigate();

    //Function to log a user out
    const signoutUser = () => {
        authCtx.logout()
        navigate('/')
    }

    //JSX for the header navigation
    return (
    <React.Fragment>
        <AppBar position="static"> 
        <ToolBar>
            <Box style={{flex: 1}}>
                <Link sx={{m: 4}} style={{color: "#FFF"}} href="home" underline="hover">Home</Link>
                <Link  sx={{m: 4}} style={{color: "#FFF"}} href="add-card" underline="hover">Add Card</Link>
            </Box>
            <Button style={{color: "#FFF", flexDirection:"flex-end"}} className="nav-link-btn" href="#" onClick={signoutUser}>LogOut</Button>
        </ToolBar>
        </AppBar>
    </React.Fragment>
    )
}

export default Nav;