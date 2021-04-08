import React from 'react';

import { Route,Navigate } from 'react-router-dom';
import Login from '../auth/Login';

const PrivateRoute = ({login,...props}) => {
    
    return login ? (
        <Route {...props} />
    ) : (
        <Navigate to="/login" replace component={Login}/>
    )
}

export default PrivateRoute;
