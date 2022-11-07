import React, { lazy, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { Menu } from 'antd';

import { PrivateRoutes } from '@/models';
import { RoutesWithNotFound } from '@/components';

import logo from '@/assests/images/logo.png';

const Home = lazy(() => import('./home/Home'));

export default function Private() {
    const [colapce, setColapce] = useState(true);

    return (
        <div className='vh-100'>
            <div className='d-flex h-100'>
                <Menu mode='inline' inlineCollapsed={colapce} style={{ maxWidth: 150 }}>
                    <Menu.Item onClick={() => setColapce(!colapce)}>item 1</Menu.Item>
                    <Menu.Item>item 2</Menu.Item>
                    <Menu.SubMenu title='sub menu'>
                        <Menu.Item>item 3</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
                <div className='flex-1 h-100'>
                    <div className='d-flex flex-column h-100'>
                        <nav className='w-100 bg-primary'>
                            <img src={logo} alt={logo} width={180} />
                        </nav>
                        <div className='flex-1'>
                            <div className='container h-100'>
                                <RoutesWithNotFound>
                                    <Route path='/' element={<Navigate to={PrivateRoutes.HOME} />} />
                                    <Route path={PrivateRoutes.HOME} element={<Home />} />
                                </RoutesWithNotFound>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
