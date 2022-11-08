import React, { useCallback, useState } from 'react';
import { Button, Divider, Form, Input, message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login';

import { setSession } from '@/redux/state';
import { PrivateRoutes } from '@/models';
import { Icon } from '@/components';
import FormItem from 'antd/es/form/FormItem';
import { httpSingIn, _KEYS } from '@/services';
import { sessionAdapter } from '@/adapters';
import logo from '@/assests/images/logo.png';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPass, setShowPass] = useState(false);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLoginStart = useCallback(() => {}, []);
    const onLogout = useCallback(() => {}, []);
    const onResolve = ({ provider, data }) => handleSubmit({ provider, ...data, registration: true });
    const onReject = err => console.error('Error', err);

    const handleSubmit = values => {
        setLoading(true);
        httpSingIn(values)
            .then(res => {
                if (res.message) message.warning(res.message);
                dispatch(setSession({ session: sessionAdapter(res.session), token: res.token }));
                navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
            })
            .catch(err => message.error(err.message))
            .finally(() => setLoading(false));
    };

    return (
        <div className='container vh-100 bg-gradien'>
            <div className='h-100 d-flex flex-column justify-content-center align-items-center text-center gap-3'>
                <div className='card p-3 '>
                    <Form onFinish={handleSubmit}>
                        <img src={logo} alt='logo' width={180} className='mb-3' />
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
                        <Button htmlType='submit' type='primary' block disabled={loading} loading={loading}>
                            Iniciar Sesión
                        </Button>
                        <Divider plain className='text-primary'>
                            Or
                        </Divider>
                        <div className='d-flex align-items-center justify-content-center gap-3'>
                            <LoginSocialGoogle
                                client_id={_KEYS.GOOGLEID}
                                onLoginStart={onLoginStart}
                                onResolve={onResolve}
                                onReject={onReject}
                                scope='openid profile email'
                                discoveryDocs='claims_supported'
                                access_type='offline'
                            >
                                <Button htmlType='button' shape='circle' icon={<Icon.Google />} />
                            </LoginSocialGoogle>
                            <LoginSocialFacebook
                                appId={_KEYS.FBID}
                                fieldsProfile={'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'}
                                onLoginStart={onLoginStart}
                                onLogoutSuccess={onLogout}
                                onResolve={onResolve}
                                onReject={onReject}
                            >
                                <Button htmlType='button' shape='circle' icon={<Icon.Facebook color='#1877F2' />} />
                            </LoginSocialFacebook>
                        </div>
                        <Button type='text' block className='text-primary mt-3' htmlType='button' onClick={() => setModal(true)}>
                            Olvide mi contraseña
                        </Button>
                    </Form>
                </div>
            </div>

            <Modal
                open={modal}
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
