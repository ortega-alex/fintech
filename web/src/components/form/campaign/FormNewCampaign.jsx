import { httpAddOrUpdateCampaign } from '@/services';
import { newCode } from '@/utilities';
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function FormNewCampaign({ onClose }) {
    const sessionState = useSelector(store => store.session);
    const code = newCode();

    const [loading, setLoading] = useState(false);
    const handleSubmit = values => {
        setLoading(true);
        httpAddOrUpdateCampaign({ ...values, creation_user_id: sessionState.sesion_id, code })
            .then(res => {
                message[res.error === false ? 'success' : 'warning'](res.message);
                if (res.error === false) onClose(true);
            })
            .catch(err => message.error(err.message))
            .finally(() => setLoading(false));
    };
    return (
        <Form layout='vertical' onFinish={handleSubmit}>
            <label htmlFor='code'>Codigo: {code}</label>
            <Form.Item label='Nombre:' name='campaign' rules={[{ required: true, message: 'El campo es requerido' }]}>
                <Input placeholder='Ingrese un nombre a la campaña' />
            </Form.Item>
            <Form.Item label='Descripción:' name='description'>
                <Input.TextArea rows={3} placeholder='Ingrese una descripción' />
            </Form.Item>
            <div className='text-right'>
                <Button type='primary' htmlType='submit' disabled={loading} loading={loading}>
                    Enviar
                </Button>
            </div>
        </Form>
    );
}
