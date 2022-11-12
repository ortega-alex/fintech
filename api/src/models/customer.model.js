import { executeQuery } from '../utilities';

export const getAllCustomers = async (only_active = false) => {
    const _WHERE = only_active ? 'WHERE a.state = 1' : '';
    const strQuery = `  SELECT a.*,
                            IF(a.state = 1, 'Activo', 'Inactivo') AS _state,
                            b.username
                        FROM customer a
                        INNER JOIN user b ON a.user_id = b.user_id
                        ${_WHERE}
                        ORDER BY a.customer`;
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
                        WHERE c.campaign_id = ${id}
                        ORDER BY a.customer`;
    const res = await executeQuery(strQuery);
    if (res.error) throw res.error.sqlMessage;
    return res;
};
