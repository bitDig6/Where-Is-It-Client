import React, { useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import auth from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

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

    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            //TODO 1: Generate Token
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
        logOutUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;