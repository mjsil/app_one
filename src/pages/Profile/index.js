import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import Container from '../../components/Container';

import {
        ContentFull, Header, HeaderLabel, Content, Option, Label
} from './styles';

const Profile = () => {
    const [userName, setUserName] = useState('');
    const isIos = Platform.OS === 'ios' ? true : false;
    const navigation = useNavigation();

    useEffect(() => {
        const getUserName = async() => {
            const getName = await AsyncStorage.getItem('userName');

            if(getName) {
                setUserName(getName);
            }
        }

        getUserName();
    },[]);

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
                <ScrollView>
                    <Content>
                        <Option onPress={() => goHome()}>
                            <FontAwesome name="power-off" size={26} color="#79CB39" />
                            <Label>Sair</Label>
                        </Option>
                    </Content>
                </ScrollView>
            </ContentFull>
        </Container>
    );
}

export default Profile;
