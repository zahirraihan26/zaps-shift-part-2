import axios from 'axios';
import React, {  useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSuqure = axios.create({
    baseURL:'http://localhost:3000'
})

const useAxiosSequre = () => {
   const {user,logOut}=useAuth()
   const navigate =useNavigate()
    useEffect(() => {
       const reqInterceptor= axiosSuqure.interceptors.request.use( config=>{
         config.headers.Authorization =`Bearer ${user?.accessToken}`;   
            
         return config;
        })

        // Interceptor respnose
        const resInterceptor= axiosSuqure.interceptors.response.use((response)=>{
            return response;
        },
        (error)=>{
            console.log('response error',error);

            const statuscode = error.status;
            if(statuscode===401 || statuscode===403){
                // logout user
               logOut()
               .then( ()=>{
                navigate('/login')
               })
            }

            return Promise.reject (error);

        })

        return ()=>{
            axiosSuqure.interceptors.request.eject(reqInterceptor)
            axiosSuqure.interceptors.response.eject(resInterceptor)
        }

    }, [user,logOut,navigate])
    
    return axiosSuqure
};

export default useAxiosSequre;