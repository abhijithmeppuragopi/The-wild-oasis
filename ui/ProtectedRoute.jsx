import styled from "styled-components";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import useUSer from "../features/authentication/useUser";
import { useEffect } from "react";

const FullScreen=styled.div`
    height:100vh;
    display:flex;
    flex-direction:column;

`

export default function ProtectedRoute({children}){
    const navigate=useNavigate()
    //get the user
    const {user,isAuthenticated,isLoading}=useUSer();
    console.log(user,'user') 
    
    //if no authenticated user redirect to login
    useEffect(function(){
        if(!isAuthenticated && !isLoading ) return navigate('/login')
    },[isAuthenticated,isLoading,navigate])
     
      //if loading show a spinner
      if(isLoading) return <FullScreen>
      <Spinner/>
      </FullScreen>  

    //if theres return children
    
    if(isAuthenticated) return children

}