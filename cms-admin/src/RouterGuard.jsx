import React from 'react';
import { Route, Navigate } from "react-router-dom";

const GuardedRoute = ({ redirectPath = '/',
    auth, children,
}) => {
    if (!auth) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;


}

export default GuardedRoute;