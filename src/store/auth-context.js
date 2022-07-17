import React from 'react';
import {useState} from 'react'
import {auth} from '../firebase.js'

//Context to store logged in user information
const AuthContext = React.createContext({
    token : '',
    isLoggedIn: false,
    login: (token) => {

    },
    logout: () => {

    },
    uid: ''
});

//For auto logout
const calcRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const addExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = addExpirationTime - currentTime;
    return remainingDuration;
}

//component to store all login, logout and user log in states
export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token') //unique login in token
    const [token, setToken] = useState(initialToken);
    const [uid, setUid] = useState('') //uniqe user id for logging in 
    const userIsLoggedIn = !!token; //record user login if token is now genrated
     
    //To log user in 
    const loginHandler = (token, expTime, id) => {
        setToken(token);
        setUid(id)
        //user local storage to store authorization token and uid
        localStorage.setItem('token', token);
        localStorage.setItem('uid', id);
        const remainingTime = calcRemainingTime(expTime);

        //Auto logout user afer 1 hour
        if(remainingTime <= 3600) {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime');
            localStorage.removeItem('uid', id);
        }

        setTimeout(logoutHandler, remainingTime);
    };

    //Log out a user 
    const logoutHandler = () => {
        setToken(null);
        setUid(null);
        localStorage.removeItem('token');
       
        auth.signOut();

    }

    //Use this to allow user to navigate after login
    var contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        uid: uid
    };
    
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;