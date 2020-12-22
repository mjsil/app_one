import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MailComposer from 'expo-mail-composer';
import { Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import Container from '../../components/Container';

import {
        ContentFull, Header, HeaderLabel, Content, Option, Label
} from './styles';

const Profile = () => {
    const [userName, setUserName] = useState('');
    const isIos = Platform.OS === 'ios' ? true : false;
    const navigation = useNavigation();
    const message = `Olá One Elevadores, estou entrando em contato pois gostaria de ajuda em: `;
    const oneEmail = 'm.j.silveira@outlook.com';

    useEffect(() => {
        const getUserName = async() => {
            const getName = await AsyncStorage.getItem('userName');

            if(getName) {
                setUserName(getName);
            }
        }

        getUserName();
    },[]);

    const sendMail = () => {
        MailComposer.composeAsync({
            subject: `Ajuda - One Elevadores`,
            recipients: [oneEmail],
            body: message
        });
    }

    const goHome = async() => {
        await AsyncStorage.removeItem('loginToken');
        await AsyncStorage.removeItem('userName');

        navigation.navigate("Home");
    }

    return (
        <Container>
            <ContentFull isIos={isIos}>
                <Header>
                    <HeaderLabel>{userName}</HeaderLabel>
                </Header>
                <Content>
                    <View style={{ flex: 1 }}>
                        <Option onPress={() => sendMail()}>
                            <MaterialCommunityIcons name="email-outline" size={26} color="#79CB39" />
                            <Label>Ajuda</Label>
                        </Option>
                        <Option onPress={() => {}}>
                            <MaterialCommunityIcons name="book-open-outline" size={26} color="#79CB39" />
                            <Label>Termos</Label>
                        </Option>
                    </View>
                    <Option onPress={() => goHome()}>
                        <FontAwesome name="power-off" size={26} color="#79CB39" />
                        <Label>Sair</Label>
                    </Option>
                    <View>
                        <Option onPress={() => {}} versao={true}>
                            <Label versao={true}>Versão: 0.52.2</Label>
                        </Option>
                    </View>
                </Content>
            </ContentFull>
        </Container>
    );
}

export default Profile;
