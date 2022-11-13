import { executeQuery } from '../utilities';

export const getAllCustomers = async (only_active = false) => {
    const _WHERE = only_active ? 'WHERE a.state = 1' : '';
    const strQuery = `  SELECT a.*,
                            IF(a.state = 1, 'Activo', 'Inactivo') AS _state,
                            b.username
                        FROM customer a
                        INNER JOIN user b ON a.user_id = b.user_id
                        ${_WHERE}`;
    const res = await executeQuery(strQuery);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const getCustomersByCampaignId = async id => {
    const strQuery = `  SELECT a.*,
                            IF(a.state = 1, 'Activo', 'Inactivo') AS _state,
                            b.username
                        FROM customer a
                        INNER JOIN user b ON a.user_id = b.user_id
                        INNER JOIN campaign_customer c ON a.customer_id = c.customer_id
                        WHERE c.campaign_id = ${id}`;
    const res = await executeQuery(strQuery);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const addCustomer = async values => {
    const { customer_id, user_id, campaign_form_id, state, campaign_id, customer } = onFormat(values);
    let strQuery = `  INSERT INTO customer (customer_id, user_id, campaign_form_id, customer, answers, state)
                        VALUES (?, ?, ?, ?, ?, ?) AS val
                        ON DUPLICATE KEY UPDATE
                        customer = val.customer,
                        answers = val.answers,
                        state = val.state,
                        edition_date = CURRENT_TIMESTAMP()`;
    const resCustomer = await executeQuery(strQuery, [customer_id, user_id, campaign_form_id, customer, JSON.stringify(values), state]);
    if (resCustomer.error) throw resCustomer.error.sqlMessage;

    strQuery = `SELECT * 
                FROM campaign_customer 
                WHERE campaign_id = ? 
                AND customer_id = ?`;
    const campaign_customer = await executeQuery(strQuery, [campaign_id, resCustomer.insertId]);
    if (campaign_customer.error) throw campaign_customer.error.sqlMessage;
    if (campaign_customer.length === 0) {
        strQuery = `INSERT INTO campaign_customer (campaign_id, customer_id)
                    VALUES (?, ?)`;
        const res = await executeQuery(strQuery, [campaign_id, resCustomer.insertId]);
        if (res.error) throw res.error.sqlMessage;
    }

    return resCustomer.insertId;
};

const onFormat = data => {
    data.toString();
    data.customer_id = 'customer_id' in data ? (data.customer_id ? parseInt(data.customer_id) : 0) : 0;
    data.user_id = 'user_id' in data ? parseInt(data.user_id) : 0;
    data.campaign_id = 'campaign_id' in data ? parseInt(data.campaign_id) : 0;
    data.campaign_form_id = 'campaign_form_id' in data ? parseInt(data.campaign_form_id) : 0;
    data.customer = 'customer' in data ? String(data.customer).trim() : null;
    data.state = 'state' in data ? parseInt(data.state) : 1;
    return data;
};
