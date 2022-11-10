import { addOrUpdateCampaign, getAllCampagns } from '../models';

export const getAllCampaignsCtr = (req, res) =>
    getAllCampagns()
        .then(campaigns => res.status(200).json(campaigns))
        .catch(error => res.status(500).json({ message: 'Ha ocurrido un error interno', error }));

export const addOrUpdateCampaignCtr = async (req, res) => {
    const { creation_user_id, campaign, code } = req.body;
    if (!creation_user_id || !campaign || !code)
        return res.status(203).json({ message: 'No se pudieron recuperar campos que son obligatorios' });
    addOrUpdateCampaign(req.body)
        .then(() => res.status(200).json({ error: false, message: 'Campaña guardado exitosamente' }))
        .catch(error => res.status(500).json({ message: 'Ha ocurrido un error interno', error }));
};
