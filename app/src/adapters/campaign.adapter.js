/**
 *
 * @param {Request} values
 * @returns {Object}
 */

export const settingsFormAdapter = values => ({
    campaign_form_id: values.campaign_form_id,
    campaign_id: values.campaign_id,
    proccess_id: values.proccess_id,
    name: values.campaign_form,
    settings: values.settings ? JSON.parse(values.settings) : [],
    description: values.description
});
