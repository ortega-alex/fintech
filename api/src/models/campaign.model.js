import { executeQuery } from '../utilities';

export const getAllCampagns = async (only_active = false) => {
    const _WHERE = only_active ? 'WHERE a.state = 1' : '';
    const strQuery = `  SELECT a.*, 
                            b.username,
                            (SELECT GROUP_CONCAT(proccess_id) FROM campaign_form WHERE campaign_id = a.campaign_id) AS forms_ids
                        FROM campaign a
                        INNER JOIN user b ON a.creation_user_id = b.user_id
                        ${_WHERE}
                        ORDER BY a.campaign`;
    const res = await executeQuery(strQuery);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const addOrUpdateCampaign = async data => {
    const { campaign_id, creation_user_id, campaign, code, state } = onFormat(data);
    const strQuery = `  INSERT INTO campaign (campaign_id, creation_user_id, code, campaign, state)
                        VALUES (?, ?, ?, ?, ?) AS val
                        ON DUPLICATE KEY UPDATE
                        campaign = val.campaign,
                        state = val.state,
                        edition_date = CURRENT_TIMESTAMP()`;
    const res = await executeQuery(strQuery, [campaign_id, creation_user_id, code, campaign, state]);
    if (res.error) throw res.error.sqlMessage;
    return res.insertId;
};

const onFormat = data => {
    data.toString();
    data.campaign_id = 'campaign_id' in data ? parseInt(data.campaign_id) : 0;
    data.creation_user_id = 'creation_user_id' in data ? parseInt(data.creation_user_id) : 0;
    data.code = 'code' in data ? String(data.code).trim() : null;
    data.campaign = 'campaign' in data ? String(data.campaign).trim() : null;
    data.state = 'state' in data ? parseInt(data.state) : 1;
    return data;
};
