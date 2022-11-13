import React, { useContext, useEffect, useState } from 'react';
import { Button, Divider, Form, message, Modal } from 'antd';
import { useSelector } from 'react-redux';

import { Icon, Inputs, SettingsForm, CustomerLayout } from '@/components';
import { httpAddOrUpdateSettingsForm } from '@/services';
import { CampaignContext } from '@/context';

export default function CustonSettingsForm({ settingForm, onClose }) {
    const sessionState = useSelector(store => store.session);
    const { campaign } = useContext(CampaignContext);

    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        const data = {
            ...settingForm,
            campaign_form: settingForm.proccess,
            user_id: sessionState.session_id,
            campaign_id: campaign.campaign_id,
            settings: JSON.stringify(settings)
        };
        httpAddOrUpdateSettingsForm(data)
            .then(res => {
                message[res.error ? 'warning' : 'success'](res.message);
                if (!res.error) onClose();
            })
            .catch(err => message.error('Error http add or update setting form: ' + err.message))
            .finally(() => setLoading(false));
    };

    const viewRender = () => {
        return settings.map((item, i) => (
            <div className='row' key={i}>
                <div className='col-10'>
                    <Inputs arr={[item]} />
                </div>
                <div className='col-2'>
                    <Button
                        type='text'
                        size='large'
                        danger
                        htmlType='button'
                        icon={<Icon.Trash />}
                        onClick={() =>
                            Modal.confirm({
                                title: 'Eliminación de configuración ',
                                content: '¿Estás seguro de querer eliminar esta configuración?',
                                onOk: () => setSettings(settings.filter(_item => _item !== item)),
                                cancelText: 'Cancelar',
                                okText: 'Sí'
                            })
                        }
                    />
                </div>
            </div>
        ));
    };

    useEffect(() => {
        if (settingForm.settings) setSettings(settingForm.settings);
    }, []);

    return (
        <>
            <Form layout='vertical' autoCapitalize='on' autoComplete='off' onFinish={handleSubmit} initialValues={{ state: true }}>
                {settingForm && settingForm.proccess_id == '1' ? (
                    <CustomerLayout disabled={true} required={false}>
                        {viewRender()}
                    </CustomerLayout>
                ) : (
                    <>
                        <Divider plain className='text-primary'>
                            configuración
                        </Divider>
                        {viewRender()}
                    </>
                )}

                <div className='d-flex align-items-center justify-content-end gap-3'>
                    <Button type='primary' htmlType='submit' disabled={loading} loading={loading}>
                        Guardar
                    </Button>
                    <Button
                        type='primary'
                        className='text-white bg-secondary'
                        htmlType='button'
                        icon={<Icon.Cog />}
                        onClick={() => setModal(true)}
                    >
                        Agregar Configuracón
                    </Button>
                </div>
            </Form>

            <Modal
                open={modal}
                destroyOnClose
                onCancel={() => setModal(false)}
                centered
                width={700}
                footer={null}
                title={<h4>Configuración</h4>}
            >
                <SettingsForm
                    onClose={input => {
                        if (input) setSettings([...settings, input]);
                        setModal(false);
                    }}
                />
            </Modal>
        </>
    );
}
