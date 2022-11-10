import React, { useEffect, useState } from 'react';
import { Button, message, Modal, Table } from 'antd';

import { FormNewCampaign, Icon } from '@/components';
import { httpGetAllCampaigns } from '@/services';
import { dateFormat } from '@/utilities';

export default function Campaign() {
    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [modals, setModals] = useState({
        new: false,
        view: false
    });

    const handleOnChangeModal = (name, value) => setModals({ ...modals, [name]: value });

    const handleGetCampaigns = () => {
        setLoading(true);
        httpGetAllCampaigns()
            .then(res => setCampaigns(res))
            .catch(err => message.error(err))
            .finally(() => setLoading(false));
    };

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
                        pageSize: 50
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
                                            // setTicket(ticketAdapter(item));
                                            // addTicket(ticketAdapter(item));
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
        </div>
    );
}
