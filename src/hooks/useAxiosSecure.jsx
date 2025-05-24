import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const axiosInstance = axios.create({
    baseURL: 'https://where-is-it-server-xi.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { logOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (error.status === 401 || error.status === 403) {
                logOutUser()
                    .then(() => {
                        navigate('/login');
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "An Error Occurred",
                            text: error.message,
                            icon: "error"
                        });
                    })
            }

            return Promise.reject(error);
        })
    }, []);

    return axiosInstance;
};

export default useAxiosSecure;