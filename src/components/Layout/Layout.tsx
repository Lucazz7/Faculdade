import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { SLayout } from './styles';

const Layout = (children: any) => {
    return (
        <SLayout>
            <Sidebar />
        </SLayout>
    );
};

export default Layout;
