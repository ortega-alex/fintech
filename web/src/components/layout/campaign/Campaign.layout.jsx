import React, { useContext, useEffect, useState } from 'react';
import { Button, message, Modal, Table } from 'antd';

import { CampaignContext } from '@/context';
import { Icon, CustomerForm } from '@/components';
import { copyToClipboard, dateFormat } from '@/utilities';
import { httpGetCustomersByCampaignId } from '@/services';
import { customerAdapter } from '@/adapters';

export default function CampaignLayout() {
    const { campaign } = useContext(CampaignContext);

    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState({});
    const [modal, setModal] = useState(false);

    const handleGetCustomers = () => {
        setLoading(true);
        httpGetCustomersByCampaignId(campaign.campaign_id)
            .then(res => setCustomers(res))
            .catch(err => message.error('Error http get customers by campaign id' + err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleGetCustomers();
    }, []);

    return (
        <div className='d-flex flex-column'>
            <div className='d-flex flex-row align-items-center justify-content-between'>
                <p>
                    <strong>No.</strong> {campaign.code}
                </p>
                <Button
                    shape='circle'
                    icon={<Icon.Copy />}
                    htmlType='button'
                    onClick={() =>
                        copyToClipboard(campaign.code)
                            .then(() => message.info('Código de campaña copiada'))
                            .catch(err => message.error('Ha ocurrido un error al momento de copiar el contendio', err))
                    }
                />
            </div>
            <p>
                <strong>Responsable: </strong>
                {campaign.username}
            </p>
            <div className='d-flex flex-row align-items-center justify-content-between'>
                <p>
                    <strong>Fecha:</strong> {dateFormat(campaign.creation_date)}
                </p>
                <Button type='primary' htmlType='button' icon={<Icon.Add />} onClick={() => setModal(true)}>
                    Agregar
                </Button>
            </div>
            <Table
                className='flex-1 mt-3'
                size='small'
                scrollToFirstRowOnChange={true}
                scroll={{ x: 800, y: 300 }}
                loading={loading}
                showSorterTooltip={false}
                rowKey='customer_id'
                dataSource={customers}
                columns={[
                    {
                        title: 'No.',
                        dataIndex: 'customer_id',
                        key: 'customer_id',
                        sorter: (a, b) => a.customer_id - b.customer_id
                    },
                    {
                        title: 'Nombre',
                        dataIndex: 'customer',
                        key: 'customer',
                        ellipsis: true,
                        sorter: (a, b) => a.customer.localeCompare(b.customer)
                    },
                    {
                        title: 'Estado',
                        dataIndex: '_state',
                        key: '_state',
                        sorter: (a, b) => a._state.localeCompare(b._state)
                    },
                    {
                        title: 'Opciones',
                        dataIndex: 'opciones',
                        render: (_, item) => (
                            <div className='text-center'>
                                <Button
                                    icon={<Icon.Edit />}
                                    type='link'
                                    size='small'
                                    onClick={() => {
                                        setCustomer(customerAdapter(item));
                                        setModal(true);
                                    }}
                                >
                                    Editar
                                </Button>
                            </div>
                        )
                    }
                ]}
            />

            <Modal open={modal} onCancel={() => setModal(false)} centered footer={null} title={<h4>Cliente</h4>} destroyOnClose width={450}>
                <CustomerForm
                    customer={customer}
                    onClose={val => {
                        if (val === true) handleGetCustomers();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
}
