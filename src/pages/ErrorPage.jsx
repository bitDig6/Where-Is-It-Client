import React from 'react';
import { useRouteError } from 'react-router';
import errorImg from '../assets/error.png';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className='min-h-screen flex flex-col gap-5 justify-center items-center text-center'>
            <h2 className='font-bold'>An Error Occurred</h2>
            <img className='w-24 mx-auto' src={errorImg} alt="error-occurred" />
            <p className='text-4xl font-bold'>{error.status}</p>
            <p className='text-xl font-semibold'>{error.statusText}</p>
            <p className='text-base'>{error?.error?.message}</p>
        </div>
    );
};

export default ErrorPage;