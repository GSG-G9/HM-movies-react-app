import React,{createContext,useState} from 'react'
import {node} from 'prop-types'
import firebase from '../../firebase';

export const authContext = createContext(null);

function AuthProvider({children}){
  const [isAuth,setIsAuth] = useState(false)
  firebase
		.auth()
		.onAuthStateChanged((user) => (user ? setIsAuth(true) : setIsAuth(false)));

  return (
    <authContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </authContext.Provider>
	);
}

AuthProvider.propTypes = {
	children: node.isRequired,
};

export default AuthProvider;