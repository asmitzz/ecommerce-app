import React from 'react';

import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Login from '../auth/Login';

const PrivateRoute = ({login,...props}) => {
    return login ? (
        <Route {...props} />
    ) : (
        <Redirect to="/login" component={Login}/>
    )
}

export default PrivateRoute;
