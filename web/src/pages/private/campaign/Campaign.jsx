import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Menu, message, Modal, Table } from 'antd';

import { CampaignLayout, FormNewCampaign, Icon, CustonForm } from '@/components';
import { httpGetAllCampaigns, httpGetSettingsFormByProccesIdAndCampaignId } from '@/services';
import { dateFormat } from '@/utilities';
import { CampaignContext } from '@/context';
import { campaignAdapter, settingsFormAdapter } from '@/adapters';
const menu = [
    {
        key: '0.1',
        label: 'Editar Campaña'
    },
    {
        key: '1',
        label: 'Formulario de Alta de Cliente'
    },
    {
        key: '2',
        label: 'Formulario de Pre-solicitud'
    },
    {
        key: '3',
        label: 'Formulario Solicitud'
    },
    {
        key: '4',
        label: 'Formato de Datos'
    }
];

export default function Campaign() {
    const { campaign, addCampaign, resetCampaign } = useContext(CampaignContext);

    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [modals, setModals] = useState({
        new: false,
        view: false,
        custoForm: false
    });
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    });
    const [settingForm, setSettingForm] = useState({});

    const handleOnChangeModal = (name, value) => setModals({ ...modals, [name]: value });

    const handleGetCampaigns = () => {
        setLoading(true);
        httpGetAllCampaigns()
            .then(res => setCampaigns(res))
            .catch(err => message.error(err))
            .finally(() => setLoading(false));
    };

    const handleGetCampaignForm = id =>
        httpGetSettingsFormByProccesIdAndCampaignId(id, campaign.campaign_id)
            .then(res => {
                setSettingForm(settingsFormAdapter(res));
                handleOnChangeModal('custoForm', true);
            })
            .catch(err => message.error('Error http get setting form by proccess id and campaign id: ' + err.message));

    useEffect(() => {
        handleGetCampaigns();
    }, []);

    return (
        <div className='d-flex flex-column h-100'>
            <div className='d-flex align-items-center justify-content-between'>
                <h3>Campaña</h3>
                <Button type='primary' icon={<Icon.Add />} onClick={() => handleOnChangeModal('new', true)}>
                    Agregar
                </Button>
            </div>
            <div className='flex-1'>
                <Table
                    className='flex-1'
                    size='small'
                    pagination={{
                        position: ['none', 'bottomRight'],
                        defaultCurrent: pagination.current,
                        pageSize: pagination.pageSize,
                        showSizeChanger: true,
                        onShowSizeChange: (current, pageSize) => setPagination({ current, pageSize })
                    }}
                    scrollToFirstRowOnChange={true}
                    scroll={{ x: 800, y: window.innerHeight / 2 - 50 }}
                    loading={loading}
                    showSorterTooltip={false}
                    rowKey='campaign_id'
                    dataSource={campaigns}
                    columns={[
                        {
                            title: 'No.',
                            dataIndex: 'code',
                            key: 'code',
                            sorter: (a, b) => a.code - b.code
                        },
                        {
                            title: 'Nombre',
                            dataIndex: 'campaign',
                            key: 'campaign',
                            ellipsis: true,
                            sorter: (a, b) => a.campaign.localeCompare(b.campaign)
                        },
                        {
                            title: 'Fecha',
                            dataIndex: 'creation_date',
                            key: 'creation_date',
                            sorter: (a, b) => a.creation_date.localeCompare(b.creation_date),
                            render: (_, item) => dateFormat(item.creation_date)
                        },
                        {
                            title: 'Responsable',
                            dataIndex: 'username',
                            key: 'username',
                            sorter: (a, b) => a.username.localeCompare(b.username)
                        },
                        {
                            title: 'Opciones',
                            dataIndex: 'opciones',
                            render: (_, item) => (
                                <div className='text-center'>
                                    <Button
                                        style={{ width: 40 }}
                                        icon={<Icon.Edit />}
                                        type='link'
                                        size='small'
                                        onClick={() => {
                                            addCampaign(campaignAdapter(item));
                                            handleOnChangeModal('view', true);
                                        }}
                                    >
                                        Editar
                                    </Button>
                                </div>
                            )
                        }
                    ]}
                />
            </div>

            <Modal
                open={modals.new}
                onCancel={() => handleOnChangeModal('new', false)}
                title={<h4>Nueva Campaña</h4>}
                destroyOnClose
                centered
                width={450}
                footer={null}
            >
                <FormNewCampaign
                    onClose={val => {
                        if (val === true) handleGetCampaigns();
                        handleOnChangeModal('new', false);
                    }}
                />
            </Modal>

            <Modal
                open={modals.view}
                onCancel={() => {
                    handleOnChangeModal('view', false);
                    resetCampaign();
                }}
                title={
                    <div className='d-flex align-items-center'>
                        <Dropdown
                            overlay={() => (
                                <Menu
                                    items={menu}
                                    onClick={val => {
                                        if (val.key === '0.1') handleOnChangeModal('new', true);
                                        else handleGetCampaignForm(val.key);
                                    }}
                                />
                            )}
                        >
                            <Icon.Cog size={24} />
                        </Dropdown>
                        <p className='h4'>{campaign.campaign}</p>
                    </div>
                }
                destroyOnClose
                centered
                width={900}
                footer={null}
            >
                <CampaignLayout />
            </Modal>

            <Modal
                open={modals.custoForm}
                onCancel={() => handleOnChangeModal('custoForm', false)}
                title={<h6>Configuració de Formulario: {settingForm.proccess} </h6>}
                destroyOnClose
                centered
                width={500}
                footer={null}
            >
                <CustonForm settingForm={settingForm} onClose={() => handleOnChangeModal('custoForm', false)} />
            </Modal>
        </div>
    );
}
