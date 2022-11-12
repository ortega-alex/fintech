import React, { createContext, useState } from 'react';

export const CampaignContext = createContext();
export const CampaignState = props => {
    const initialCampaign = {};
    const [campaign, setCampaign] = useState(initialCampaign);
    return (
        <CampaignContext.Provider
            value={{
                campaign,
                addCampaign: payload => setCampaign(payload),
                updateCampaign: payload => setCampaign({ ...campaign, ...payload }),
                resetCampaign: () => setCampaign(initialCampaign)
            }}
        >
            {props.children}
        </CampaignContext.Provider>
    );
};
