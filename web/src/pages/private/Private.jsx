import React, { lazy, useState } from 'react';
import { Link, Navigate, Route, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Button, Drawer, Input, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { PrivateRoutes, PublicRoutes } from '@/models';
import { Icon, RoutesWithNotFound } from '@/components';
import logo from '@/assests/images/logo.png';
import { AuthGuard } from '@/guards';
import { resetSession } from '@/redux/state';

const Campaign = lazy(() => import('./campaign/Campaign'));
const Request = lazy(() => import('./request/Request'));
const Maintenance = lazy(() => import('./maintenance/Maintenance'));

const menu = [
    {
        key: '1',
        icon: (
            <div className='btn-circle bg-warning'>
                <Icon.FolderOpen />
            </div>
        ),
        label: <Link to={PrivateRoutes.CAMPAIGNS}>Campaña</Link>
    },
    {
        key: '2',
        icon: (
            <div className='btn-circle bg-success'>
                <Icon.Profile />
            </div>
        ),
        label: <Link to={PrivateRoutes.REQUESTS}>Solicitudes</Link>
    },
    {
        key: '3',
        icon: (
            <div className='btn-circle bg-primary'>
                <Icon.Cog />
            </div>
        ),
        label: 'Mantenimientos',
        children: [
            {
                key: '3-1',
                icon: <Icon.User />,
                label: <Link to={`${PrivateRoutes.MAINTENANCE}/${PrivateRoutes.USERS}`}>Usuarios</Link>
            },
            {
                key: '3-2',
                icon: <Icon.UserSettings />,
                label: <Link to={`${PrivateRoutes.MAINTENANCE}/${PrivateRoutes.PROFILES}`}>Perfiles</Link>
            }
        ]
    }
];

export default function Private() {
    const sessionState = useSelector(store => store.session);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [collaps, setCollaps] = useState(true);
    const [drawer, setDrawer] = useState(false);

    return (
        <div className='vh-100'>
            <nav className='navbar navbar-dark'>
                <div className='d-flex'>
                    <Button type='text' className='text-white' onClick={() => setCollaps(!collaps)}>
                        {collaps ? <Icon.MenuUnfold className='h4' /> : <Icon.MenuFold className='h4' />}
                    </Button>
                    <Link to='/' className='navbar-brand'>
                        <img src={logo} width='115' className='d-inline-block align-top' alt='' />
                    </Link>
                    <div className='visible-md'>
                        <Input.Search style={{ minWidth: 500, maxWidth: '50vw' }} />
                    </div>
                </div>
                <div className='navbar-nav'>
                    <Badge count='1' className='mr-3'>
                        <Icon.Bell color='white' size={32} />
                    </Badge>
                    <Avatar
                        gap={3}
                        size={50}
                        className='bg-secondary'
                        // src={profile}
                        onClick={() => setDrawer(true)}
                    >
                        AX
                    </Avatar>
                </div>
            </nav>
            <div className='d-flex h-100'>
                <Menu mode='inline' inlineCollapsed={collaps} style={{ maxWidth: 150 }} items={menu} />
                <div className='flex-1 h-100'>
                    <div className='container h-100'>
                        <RoutesWithNotFound>
                            <Route path='/' element={<Navigate to={PrivateRoutes.CAMPAIGNS} />} />
                            <Route path={PrivateRoutes.CAMPAIGNS} element={<Campaign />} />
                            <Route path={PrivateRoutes.REQUESTS} element={<Request />} />
                            <Route element={<AuthGuard />}>
                                <Route path={`${PrivateRoutes.MAINTENANCE}/*`} element={<Maintenance />} />
                            </Route>
                        </RoutesWithNotFound>
                    </div>
                </div>
            </div>

            <Drawer
                placement='right'
                onClose={() => setDrawer(false)}
                open={drawer}
                width={200}
                footerStyle={{ border: 'none' }}
                headerStyle={{ border: 'none' }}
                footer={
                    <div className='d-flex flex-column gap-3'>
                        <Button htmlType='button' type='link'>
                            Cambiar Contraseña
                        </Button>
                        <Button
                            htmlType='button'
                            type='primary'
                            block
                            onClick={() => {
                                dispatch(resetSession());
                                navigate(`/${PublicRoutes.SINGIN}`, { replace: true });
                            }}
                            icon={<Icon.Logout />}
                        >
                            Cerrar Sesión
                        </Button>
                    </div>
                }
            >
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <Avatar
                        gap={3}
                        size={100}
                        // src={profile}
                        className='bg-secondary'
                        onClick={() => setDrawer(true)}
                    >
                        AX
                    </Avatar>
                    <strong>{sessionState.full_name}</strong>
                    <p>{sessionState.username}</p>
                </div>
            </Drawer>
        </div>
    );
}
