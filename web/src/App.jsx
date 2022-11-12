import React, { lazy, Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { HashRouter, Navigate, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import esEs from 'antd/es/locale/es_ES';

import { Loading, RoutesWithNotFound } from './components';
import store from './redux/store';
import { Theme } from './styled-components';
import { PrivateRoutes, PublicRoutes } from './models';
import { AuthGuard } from './guards';
import { PublicPrivateInterceptor } from './interceptors';

const SingIn = lazy(() => import('@/pages/sing-in/SingIn'));
const Private = lazy(() => import('@/pages/private/Private'));

export default function App() {
    useEffect(() => {
        PublicPrivateInterceptor();
    }, []);

    return (
        <React.StrictMode>
            <Suspense fallback={<Loading />}>
                <Provider store={store}>
                    <ConfigProvider locale={esEs}>
                        <ThemeProvider theme={Theme}>
                            <HashRouter>
                                <RoutesWithNotFound>
                                    <Route path='/' element={<Navigate to={PrivateRoutes.PRIVATE} />} />
                                    <Route path={PublicRoutes.SINGIN} element={<SingIn />} />
                                    <Route element={<AuthGuard />}>
                                        <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
                                    </Route>
                                </RoutesWithNotFound>
                            </HashRouter>
                        </ThemeProvider>
                    </ConfigProvider>
                </Provider>
            </Suspense>
        </React.StrictMode>
    );
}
