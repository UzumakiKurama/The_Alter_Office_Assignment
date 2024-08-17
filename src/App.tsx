import { useEffect, useState } from 'react'
import { CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { UserDataType } from './types';

import './App.css'

function App() {

  const [user, setUser] = useState<CredentialResponse | null>(null);
  const [userData, setUserData] = useState<UserDataType | null>(null);

  // Storing login credentials in localStorage to persist login session
  const getUser = (res : CredentialResponse) => {
    localStorage.setItem("userCredential", JSON.stringify(res));
    setUser(res);
  }

  const getUserData = (credentialToken : string) => {
    const userObject = jwtDecode<UserDataType>(credentialToken);
    setUserData(userObject);
  }

  // Checking if user has already logged in 
  useEffect(() => {
    const userCredential = localStorage.getItem("userCredential");
    if(userCredential){
      setUser(JSON.parse(userCredential))
    }
  }, [])

  // Decoding the user credential to get user details
  useEffect(() => {
    if(user?.credential){
      try{
        getUserData(user.credential);
      }catch (error){
        console.error(error)
      }
    }
  }, [user])

  return (
    <div>
        {
          user === null ? <Login getUser={getUser} /> : <Dashboard setUser={setUser} userData={userData} />
        }
    </div>
  )
}

export default App
