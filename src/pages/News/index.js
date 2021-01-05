import React, { useState, useEffect } from 'react';
import { ScrollView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import Container from '../../components/Container';

import {
    Content,
    Header,
    Icon,
    HeaderLabel,
    Contract,
    Message,
} from './styles';

const News = () => {
    const isIos = Platform.OS === 'ios' ? true : false;
    const navigation = useNavigation();
    const router = useRoute();
    const [notification, setNotification] = useState({});

    useEffect(() => {
        setNotification(router.params.info);
    }, []);

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <Container>
            <Content isIos={isIos}>
                <Header>
                    <Icon onPress={() => goBack()}>
                        <AntDesign name="arrowleft" size={24} color="#fff" />
                    </Icon>
                    <HeaderLabel>Avisos</HeaderLabel>
                </Header>
                <Contract>
                    <Message>{notification.notification}</Message>
                </Contract>
            </Content>
        </Container>
    );
};

export default News;
