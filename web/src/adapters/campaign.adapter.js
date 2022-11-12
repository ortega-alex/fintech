export const campaignAdapter = value => ({
    campaign_id: value.campaign_id,
    code: value.code,
    campaign: value.campaign,
    description: value.description,
    username: value.username,
    creation_date: value.creation_date
});
