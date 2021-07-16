import React, { useState, useEffect } from "react";
import AppRouter from 'components/Router';
import {authService} from 'fbase';

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(false);
    useEffect(() => {
      authService.onAuthStateChanged((user) => {
        if(user) {
          setIsLoggedIn(true);
          setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => {user.updateProfile(args)},
          });
        }else {
          setUserObj(null);
        }
        setInit(true);
      })
    }, []);
    const refreshUser = () => {
      const user = authService.currentUser;
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (args) => {
          user.updateProfile(args);
        },
      });
    }
  return (
    <>
    {init ? <AppRouter 
      refreshUser={refreshUser}
      isLoggedIn={isLoggedIn} 
      userObj={userObj}
      />
      : 
      "Initializing..."}    
    </>
  );
}

export default App;

