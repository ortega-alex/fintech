import { getAllCustomers, getCustomersByCampaignId } from '../models';

export const getAllCustomersCtr = (req, res) =>
    getAllCustomers()
        .then(campaigns => res.status(200).json(campaigns))
        .catch(error => res.status(500).json({ message: 'Ha ocurrido un error interno', error }));

export const getCustomersByCampaignIdCtr = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(203).json({ message: 'El id de la campaña es obligatorio' });
        const campaigns = await getCustomersByCampaignId(id);
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error', error });
    }
};
