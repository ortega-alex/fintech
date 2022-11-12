import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, message, Switch } from 'antd';

import { httpGetSettingsFormByProccesIdAndCampaignId } from '@/services';
import { settingsFormAdapter } from '@/adapters';
import { CampaignContext } from '@/context';
import { Inputs } from '@/components';

export default function FormCustomer({ customer }) {
    const { campaign } = useContext(CampaignContext);

    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState([]);

    const handleSubmit = values => {
        console.log(values);
    };

    useEffect(() => {
        httpGetSettingsFormByProccesIdAndCampaignId(1, campaign.campaign_id)
            .then(res => {
                const formSettings = settingsFormAdapter(res);
                if (formSettings.settings) {
                    formSettings.settings.map(item => (item.disabled = false));
                    setSettings(formSettings.settings);
                }
            })
            .catch(err => message.error('Error http get setting form by proccess id and campaign id: ' + err.message));
    }, []);

    return (
        <Form layout='vertical' autoCapitalize='on' autoComplete='off' initialValues={customer} onFinish={handleSubmit}>
            {settings.length === 0 ? (
                <div className='text-center text-danger'>No cuenta con una configuracion previa</div>
            ) : (
                <Inputs arr={settings} />
            )}
            <Form.Item name='state' label='Estado:' valuePropName='checked'>
                <Switch checkedChildren='Activo' unCheckedChildren='Inactivo' />
            </Form.Item>
            <div className='text-right'>
                <Button type='primary' htmlType='submit' disabled={loading || settings.length === 0} loading={loading}>
                    Guardar
                </Button>
            </div>
        </Form>
    );
}
