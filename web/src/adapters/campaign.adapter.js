/**
 *
 * @param {Request} value
 * @returns {Object}
 */
export const campaignAdapter = value => {
    const disabled = value.forms_ids
        ? String(value.forms_ids)
              .split(',')
              .filter(item => item === '2' || item === '3').length < 2
        : true;
    return {
        campaign_id: value.campaign_id,
        code: value.code,
        campaign: value.campaign,
        description: value.description,
        username: value.username,
        creation_date: value.creation_date,
        state: value.state === '1' ? true : false,
        disabled
    };
};

/**
 *
 * @param {Request} values
 * @param {Boolean} disabled
 * @returns {Object}
 */
export const settingsFormAdapter = (values, disabled = false) => {
    let settings = values.settings ? JSON.parse(values.settings) : [];
    if (!disabled) settings.map(item => (item.disabled = false));

    const data = {
        campaign_form_id: values.campaign_form_id,
        campaign_id: values.campaign_id,
        proccess_id: values.proccess_id,
        user_id: values.user_id,
        campaign_form: values.campaign_form,
        settings,
        state: values.state,
        creation_date: values.creation_date,
        edition_date: values.edition_date,
        proccess: values.proccess,
        description: values.description
    };
    return data;
};

/**
 *
 * @param {Request} values
 * @returns {Object}
 */
export const customerAdapter = values => {
    const answers = values.answers ? JSON.parse(values.answers) : {};
    const data = {
        customer_id: values.customer_id,
        user_id: values.user_id,
        campaign_form_id: values.campaign_form_id,
        customer: values.customer,
        state: values.state,
        creation_date: values.creation_date,
        edition_date: values.edition_date,
        _state: values._state,
        username: values.username,
        ...answers
    };
    return data;
};
