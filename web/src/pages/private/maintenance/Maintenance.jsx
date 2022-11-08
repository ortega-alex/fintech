import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { RoutesWithNotFound } from '@/components';
import { PrivateRoutes } from '@/models';

const Users = lazy(() => import('./users/Users'));
const Profiles = lazy(() => import('./profiles/Profiles'));

export default function Maintenance() {
    return (
        <RoutesWithNotFound>
            <Route path='/' element={<Navigate to={PrivateRoutes.USERS} />} />
            <Route path={PrivateRoutes.USERS} element={<Users />} />
            <Route path={PrivateRoutes.PROFILES} element={<Profiles />} />
        </RoutesWithNotFound>
    );
}
