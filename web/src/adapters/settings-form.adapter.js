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
