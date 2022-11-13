import { addCustomer, getAllCustomers, getCustomersByCampaignId } from '../models';

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

export const addCustomersCtr = async (req, res) => {
    try {
        const { user_id, campaign_form_id, campaign_id, customer } = req.body;
        if (!user_id || !campaign_form_id || !campaign_id || !customer)
            return res.status(203).json({ message: 'No se pudo recuperar valores que son obligatorios' });
        const id = await addCustomer(req.body);
        res.status(200).json({
            message: `Formulario ${campaign_form_id ? 'editado' : 'guardado'} exitosamente`,
            id
        });
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error', error });
    }
};
