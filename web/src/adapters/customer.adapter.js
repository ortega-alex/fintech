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
