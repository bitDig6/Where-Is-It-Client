import React, { useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import auth from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (updateInfo) => {
        return updateProfile(auth.currentUser, updateInfo);
    }

    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            
            if(currentUser?.email){
                const user = { email: currentUser?.email };
                axios.post('https://where-is-it-server-xi.vercel.app/jwt', user, { withCredentials: true })
                    .then( res => {
                        console.log(res.data);
                        setLoading(false);
                    })
            }else{
                axios.post('https://where-is-it-server-xi.vercel.app/logout', {}, { withCredentials: true })
                    .then( res => {
                        console.log(res.data);
                        setLoading(false);
                    })
            }            
        });
        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        loginUser,
        loginWithGoogle,
        registerUser,
        updateUserProfile,
        logOutUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;