import React from 'react';
import { Form, Input, Switch, Divider } from 'antd';

export default function CustomerLayout({ children, disabled, required = true }) {
    return (
        <>
            <Form.Item name='customer' label='Nombre:' rules={[{ required: required, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese el nombre del cliente' disabled={disabled} />
            </Form.Item>

            <Divider plain className='text-primary'>
                configuración
            </Divider>

            {children}

            <Form.Item name='state' label='Estado:' valuePropName='checked'>
                <Switch checkedChildren='Activo' unCheckedChildren='Inactivo' disabled={disabled} />
            </Form.Item>
        </>
    );
}
