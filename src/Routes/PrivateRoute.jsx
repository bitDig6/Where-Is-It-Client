import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loading from '../components/shared/common/Loading';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location  = useLocation();

    if(loading){
        return (
            <div>
                <Loading></Loading>
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