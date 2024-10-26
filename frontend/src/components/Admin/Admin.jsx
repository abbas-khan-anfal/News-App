import React, { useState, useContext, useEffect } from 'react';
import Dashboard from './Dashboard/Dashboard';
import Login from './SiteLogin/Login';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import serverUrl from '../../Config/ApiUrl';
import LgLoader from '../Loaders/LgLoader';

function Admin() {
    const { setUserAuthState, userAuthState, setUserData } = useContext(UserContext);
    //loader state
    const [loader, setLoader] = useState(true);

    const isAuthenticated = async () => {
      try
      {
        const response = await axios.get(`${serverUrl}/user/in`,{
          withCredentials: true
        });
        if(response.data.success)
        {
          setUserAuthState(true);
          setUserData(response.data.user);
        }
      }
      catch(error)
      {
        console.log(error.response?.data.message || error.message);
      }
      finally
      {
        setLoader(false);
      }
    }

    useEffect(() => {
      isAuthenticated();
      //set loader false
    },[userAuthState]);

    if(loader)
    {
      return <LgLoader/>
    }
  return (
    <>
        {
            userAuthState
            ?
            <Dashboard />
            :
            <Login />
        }
    </>
  )
}

export default Admin;