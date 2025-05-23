import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location  = useLocation();

    if(loading){
        return (
            <div>
                <div className='loading loading-spinner'></div>
            </div>
        );
    }

    if(user){
        return children;
    }

    return (
        <Navigate to='/login' state={location?.pathname}></Navigate>
    );
};

export default PrivateRoute;