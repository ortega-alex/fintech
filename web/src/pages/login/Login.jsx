import React, { useState } from 'react';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setSession } from '@/redux/state';
import { PrivateRoutes } from '@/models';
import { Icon } from '@/components';
import FormItem from 'antd/es/form/FormItem';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPass, setShowPass] = useState(false);
    const [modal, setModal] = useState(false);

    const handleSubmit = values => {
        console.log(values);
    };

    return (
        <div className='container bg-primary vh-100'>
            <div className='h-100 d-flex flex-column justify-content-center align-items-center text-center gap-3'>
                <Form style={{ width: 300, maxWidth: '90%' }} onFinish={handleSubmit}>
                    <h2 className='text-white'>Fintech</h2>
                    <Form.Item name='username' rules={[{ required: true, message: 'El campo es requerido' }]}>
                        <Input prefix={<Icon.User />} placeholder='Ingrese un usuario/correo' />
                    </Form.Item>
                    <Form.Item name='password' rules={[{ required: true, message: 'El campo es requerido' }]}>
                        <Input
                            type={showPass ? 'text' : 'password'}
                            prefix={<Icon.Lock />}
                            placeholder='Ingrese una contraseña'
                            autoComplete='off'
                            suffix={
                                <Button
                                    onClick={() => setShowPass(!showPass)}
                                    size='small'
                                    type='text'
                                    icon={showPass ? <Icon.EyeInvisible /> : <Icon.Eye />}
                                />
                            }
                        />
                    </Form.Item>
                    <Button htmlType='submit' type='default' block>
                        Iniciar Sesión
                    </Button>
                    <Divider plain className='text-white'>
                        Or
                    </Divider>
                    <div className='d-flex align-items-center justify-content-center gap-3'>
                        <Button htmlType='button' shape='circle' icon={<Icon.Google />} />
                        <Button htmlType='button' shape='circle' icon={<Icon.Facebook />} />
                    </div>
                    <Button type='text' block className='text-white mt-3' htmlType='button' onClick={() => setModal(true)}>
                        Olvide mi contraseña
                    </Button>
                </Form>
            </div>

            <Modal
                visible={modal}
                onCancel={() => setModal(false)}
                footer={null}
                title={<h4 className='text-center'>Olvide mi contraseña</h4>}
                centered
            >
                <Form layout='vertical'>
                    <FormItem label='Correo:' name='mail' rules={[{ required: true, message: 'El campo es requerido' }]}>
                        <Input prefix={<Icon.Mail />} placeholder='Ingrese un correo' />
                    </FormItem>
                    <span className='text-justify'>
                        Ingresa tu correo, el sistema validar si es un correo previamente registrado, si todo es correcto, se te enviara un
                        codigo de un solo uso para que puedas ingresar y restablecer tu contraseña
                    </span>
                    <div className='text-right mt-3'>
                        <Button type='primary' htmlType='submit'>
                            Enviar
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
