import { addOrUpdateSettingForm, getSettingFormByProccessIdAndCampaignId } from '../models';

export const getSettingFormByProccessIdAndCampaignIdCtl = async (req, res) => {
    try {
        const { proccess_id, campaign_id } = req.params;
        if (!proccess_id || !campaign_id) return res.status(203).json({ message: 'No se pudieron recuperar campos que son obligatorios' });
        const setting = await getSettingFormByProccessIdAndCampaignId(proccess_id, campaign_id);
        res.status(200).json(setting);
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};

export const addOrUpdateSettingFormCtl = async (req, res) => {
    try {
        const { campaign_form_id, campaign_id, proccess_id, user_id, campaign_form, settings } = req.body;
        if (!campaign_id || !proccess_id || !user_id || !campaign_form || !settings)
            return res.status(203).json({ message: 'No se pudieron recuperar campos que son obligatorios' });
        const id = await addOrUpdateSettingForm(req.body);
        res.status(200).json({
            message: `Formulario ${campaign_form_id ? 'editado' : 'guardado'} exitosamente`,
            id
        });
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};
