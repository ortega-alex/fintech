import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, message, Switch, Tooltip } from 'antd';
import { useSelector } from 'react-redux';

import { CampaignContext } from '@/context';
import { httpAddOrUpdateCampaign } from '@/services';
import { newCode } from '@/utilities';
import Icon from '@/components/Icon';

export default function NewCampaignForm({ onClose }) {
    const sessionState = useSelector(store => store.session);
    const { campaign } = useContext(CampaignContext);

    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState(null);

    const handleSubmit = values => {
        setLoading(true);
        httpAddOrUpdateCampaign({ ...values, state: values.state ? 1 : 0, creation_user_id: sessionState.session_id, code })
            .then(res => {
                message[res.error === false ? 'success' : 'warning'](res.message);
                if (res.error === false) onClose(true);
            })
            .catch(err => message.error(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        setCode(campaign && campaign.code ? campaign.code : newCode());
    }, []);

    return (
        <Form layout='vertical' onFinish={handleSubmit} initialValues={campaign}>
            <label htmlFor='code'>Codigo: {code}</label>
            <Form.Item label='Nombre:' name='campaign' rules={[{ required: true, message: 'El campo es requerido' }]}>
                <Input placeholder='Ingrese un nombre a la campaña' />
            </Form.Item>
            <Form.Item label='Descripción:' name='description'>
                <Input.TextArea rows={3} placeholder='Ingrese una descripción' />
            </Form.Item>
            <div className='d-flex align-items-center gap-3'>
                <Form.Item name='state' label='Estado:' valuePropName='checked'>
                    <Switch checkedChildren='Activo' unCheckedChildren='Inactivo' disabled={!campaign.campaign_id || campaign.disabled} />
                </Form.Item>
                <Tooltip title='Solo se puede activar la campaña al tener configurado un formulario de presolicitud y solocicitud respectivamente, esto con el fin que aparezca lista para usarse en el app'>
                    <Icon.Question size={20} />
                </Tooltip>
            </div>

            <div className='text-right'>
                <Button type='primary' htmlType='submit' disabled={loading} loading={loading}>
                    Enviar
                </Button>
            </div>
        </Form>
    );
}
