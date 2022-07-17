import './App.css';
import AuthContext from './store/auth-context';
import AuthPage from './components/AuthPage.js';
import Home from './components/Home.js';
import AddCard from './components/AddCard.js';
import EditCard from './components/EditCard.js';
import SignUp from './components/SignUp.js';
import { Routes, Route} from 'react-router-dom';
import { useContext} from 'react';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Routes>
        {!authCtx["isLoggedIn"] && (<Route 
        path='/' 
        element= {<AuthPage />} />
        )}
         {!authCtx["isLoggedIn"] && (<Route 
        path='signup' 
        element= {<SignUp />} />
        )}
        {!authCtx["isLoggedIn"] && (<Route 
        path='home' 
        element= {<AuthPage />} />
        )}
        {authCtx["isLoggedIn"] && (<Route
        path='/'
        element={<Home/>}/>
        )}
        {authCtx["isLoggedIn"] && (<Route
        path='home'
        element={<Home/>}/>
        )}
        {authCtx["isLoggedIn"] && (<Route
        path='add-card'
        element={<AddCard/>}/>
        )}
        {authCtx["isLoggedIn"] && (<Route
        path='edit-card'
        element={<EditCard/>}/>
        )}
    </Routes>
  );
}

export default App;
