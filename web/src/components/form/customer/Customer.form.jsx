import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, message } from 'antd';

import { httpAddOrUpdateCustomers, httpGetSettingsFormByProccesIdAndCampaignId } from '@/services';
import { settingsFormAdapter } from '@/adapters';
import { CampaignContext } from '@/context';
import { CustomerLayout, Inputs } from '@/components';
import { useSelector } from 'react-redux';

export default function CustomerForm({ customer, onClose }) {
    const sessionState = useSelector(store => store.session);
    const { campaign } = useContext(CampaignContext);

    const [loading, setLoading] = useState(false);
    const [formSettings, setFormSettings] = useState({});

    const handleSubmit = values => {
        setLoading(true);
        httpAddOrUpdateCustomers({
            ...values,
            state: values.state ? 1 : 0,
            campaign_form_id: formSettings.campaign_form_id,
            campaign_id: formSettings.campaign_id,
            user_id: sessionState.session_id
        })
            .then(res => {
                message[res.error ? 'warning' : 'success'](res.message);
                if (!res.error) onClose(true);
            })
            .catch(err => message.error('Error http add or update customer: ' + err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        httpGetSettingsFormByProccesIdAndCampaignId(1, campaign.campaign_id)
            .then(res => setFormSettings(settingsFormAdapter(res)))
            .catch(err => message.error('Error http get setting form by proccess id and campaign id: ' + err.message));
    }, []);

    return (
        <Form
            layout='vertical'
            autoCapitalize='on'
            autoComplete='off'
            initialValues={{ ...customer, state: !customer.state || customer.state === 1 ? true : false }}
            onFinish={handleSubmit}
        >
            <CustomerLayout>
                {formSettings.settings && formSettings.settings.length === 0 && (
                    <div className='text-center text-danger'>No cuenta con una configuracion previa</div>
                )}
                {formSettings.settings && <Inputs arr={formSettings.settings} />}
            </CustomerLayout>

            <div className='text-right'>
                <Button
                    type='primary'
                    htmlType='submit'
                    disabled={loading || (formSettings.settings && formSettings.settings.length === 0)}
                    loading={loading}
                >
                    Guardar
                </Button>
            </div>
        </Form>
    );
}
