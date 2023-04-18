import React, { useState, createContext, useContext } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api/';

const AuthContext = createContext();


function useProvideAuth() {
  const [user, setUser] = useState(null);
  console.log(`en el provider ${user}`);
  const signIn = async (email, password) => {
    const options = {
        headers: {
            accept: '*/*',  //aceptar todo
            'Content-Type': 'application/json',
        }
    };
    const tokenCookie = Cookie.get('token');
    let token;
    if(tokenCookie){
      token = tokenCookie;
    } else if (email) {
      const { data: {access_token} } = await axios.post(endPoints.auth.login, { email, password }, options);
      token = access_token;
    };
    
    
    if(token){
        Cookie.set('token', token, { expires: 5 });
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        const {data: user} = await axios.get(endPoints.auth.profile);
        setUser(user);
    };
  
  };
  const data = { user, signIn };
  return data;
}

function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{ children }</AuthContext.Provider>;
}

const useAuth = () => {
  return useContext(AuthContext);
};

export {ProviderAuth, useAuth};