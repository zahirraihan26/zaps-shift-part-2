import axios from 'axios';
import React from 'react';

const axiosSuqure = axios.create({
    baseURL:'http://localhost:3000'
})

const useAxiosSequre = () => {

    
    return axiosSuqure
};

export default useAxiosSequre;