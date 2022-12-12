import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import { ScrollView as Scroll } from 'react-native-gesture-handler';

import { colors, mainStyle } from '@/Style';
import { httpCampaignsAcive, httpGetSettingsForm } from '@/services';
import { settingsFormAdapter } from '@/adapters';
import { Inputs } from '@/components';

export default function NewRequests() {
    const bsRef = useRef();
    const [requets, setRequets] = useState({
        campaign_id: 0,
        campaign: null
    });
    const [campaigns, setCampaigns] = useState([]);
    const [list, setList] = useState(null);
    const [settingsForm, setSettingsForm] = useState(null);
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const handleOnChange = (name, value) => {
        setValues({ ...values, [name]: value });
    };

    const handleSelectedCampaing = item => {
        httpGetSettingsForm(2, item.campaign_id)
            .then(res => {
                setSettingsForm(settingsFormAdapter(res));
                bsRef.current.snapTo(1);
                setRequets({ ...requets, campaign_id: item.campaign_id, campaign: item.campaign });
            })
            .catch(err => Alert.alert('Error del servidor', err.message));
    };

    useEffect(() => {
        httpCampaignsAcive()
            .then(res => setCampaigns(res))
            .catch(err => Alert.alert('Error del servidor', err.message));
    }, []);

    return (
        <>
            <View style={styles.container}>
                <StatusBar translucent backgroundColor={colors.primary} />
                <Text style={mainStyle.label}>Tipo de prestamo:</Text>
                <TouchableOpacity
                    onPress={() => {
                        setList('campaigns');
                        bsRef.current.snapTo(0);
                    }}
                >
                    <View style={{ ...styles.row, justifyContent: 'space-between', paddingVertical: 20 }}>
                        <Text>{requets.campaign || 'Seleccione una opción'}</Text>
                        <MaterialIcon name='keyboard-arrow-down' color={colors.black} size={20} />
                    </View>
                </TouchableOpacity>

                <View style={mainStyle.divide}>
                    <View style={mainStyle.line} />
                    <Text style={mainStyle.titleDivide}>Requisitos</Text>
                    <View style={mainStyle.line} />
                </View>

                {settingsForm && settingsForm.settings && (
                    <>
                        <ScrollView>
                            <Inputs arr={settingsForm.settings} values={values} errors={errors} onChange={handleOnChange} />
                        </ScrollView>
                        <TouchableOpacity style={{ ...mainStyle.button, backgroundColor: colors.primary }}>
                            <Text style={{ color: colors.white }}>Guardar</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            <BottomSheet
                ref={bsRef}
                snapPoints={[300, 0]}
                borderRadius={10}
                initialSnap={1}
                enabledGestureInteraction={true}
                renderHeader={() => (
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.headerButton} />
                    </View>
                )}
                renderContent={() => (
                    <View style={styles.headerBottomSheet}>
                        <Scroll>
                            {list === 'campaigns' &&
                                campaigns.map(item => (
                                    <TouchableOpacity key={item.campaign_id} onPress={() => handleSelectedCampaing(item)}>
                                        <Text style={styles.item}>{item.campaign}</Text>
                                    </TouchableOpacity>
                                ))}
                        </Scroll>
                    </View>
                )}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteLinght,
        justifyContent: 'flex-start',
        padding: 32
    },
    row: {
        flexDirection: 'row',
        borderBottomColor: colors.blackLinght,
        borderBottomWidth: 1,
        marginBottom: 16,
        alignItems: 'center'
    },
    input: {
        flex: 1
    },
    headerBottomSheet: {
        backgroundColor: colors.white,
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
        width: '100%',
        height: 300,
        padding: 10
    },
    headerButton: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.black,
        marginBottom: 10
    },
    item: {
        padding: 8,
        fontSize: 14,
        fontWeight: '400',
        color: colors.black
    }
});
