import { executeQuery } from '../utilities';

export const getSettingFormByProccessIdAndCampaignId = async (process_id, campaign_id) => {
    const strQuery = `  SELECT b.*, a.* 
                        FROM proccess a 
                        LEFT JOIN campaign_form b ON a.proccess_id = b.proccess_id AND b.campaign_id = ?
                        WHERE a.proccess_id = ?`;
    const res = await executeQuery(strQuery, [campaign_id, process_id]);
    if (res.error) throw res.error.sqlMessage;
    return res.length > 0 ? res[0] : {};
};

export const addOrUpdateSettingForm = async values => {
    const { campaign_form_id, campaign_id, proccess_id, user_id, campaign_form, settings, state } = onFormat(values);
    const strQuery = `  INSERT INTO campaign_form (campaign_form_id, campaign_id, proccess_id, user_id, campaign_form, settings, state)
                        VALUES (?, ?, ?, ?, ?, ?, ?) AS val
                        ON DUPLICATE KEY UPDATE
                        settings = val.settings,
                        state = val.state,
                        edition_date = CURRENT_TIMESTAMP()`;
    const res = await executeQuery(strQuery, [campaign_form_id, campaign_id, proccess_id, user_id, campaign_form, settings, state]);
    if (res.error) throw res.error.sqlMessage;
    return res.insertId;
};

const onFormat = data => {
    data.toString();
    data.campaign_form_id = 'campaign_form_id' in data ? (data.campaign_form_id ? parseInt(data.campaign_form_id) : 0) : 0;
    data.campaign_id = 'campaign_id' in data ? parseInt(data.campaign_id) : 0;
    data.proccess_id = 'proccess_id' in data ? parseInt(data.proccess_id) : 0;
    data.user_id = 'user_id' in data ? parseInt(data.user_id) : 0;
    data.campaign_form = 'campaign_form' in data ? String(data.campaign_form).trim() : null;
    data.settings = 'settings' in data ? String(data.settings).trim() : null;
    data.state = 'state' in data ? parseInt(data.state) : 1;
    return data;
};
