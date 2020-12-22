import React from 'react';
import { ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import Container from '../../components/Container';

import {
    Content, Header, Icon, HeaderLabel, Contracts, Contract, Name, Date
} from './styles';

const allNews = [
    {
        name: "Edifício Terra Brasílis",
        date: "12/09/2020",
    },
    {
        name: "Edifício Terra Brasílis",
        date: "12/09/2020",
    },
    {
        name: "Edifício Terra Brasílis",
        date: "12/09/2020",
    },{
        name: "Edifício Terra Brasílis",
        date: "12/09/2020",
    },
    {
        name: "Edifício Terra Brasílis",
        date: "12/09/2020",
    },
    {
        name: "Edifício Terra Brasílis",
        date: "12/09/2020",
    },
    {
        name: "Edifício Terra Brasílis",
        date: "12/09/2020",
    },
    {
        name: "Edifício Terra Brasílis",
        date: "12/09/2020",
    },
    {
        name: "Edifício Terra Brasílis",
        date: "12/09/2020",
    },
    {
        name: "Edifício Terra Brasílis",
        date: "12/09/2020",
    },
    {
        name: "Edifício Terra Brasílis",
        date: "12/09/2020",
    },
    {
        name: "Edifício Terra Brasílis",
        date: "12/09/2020",
    },
    {
        name: "Edifício Terra Brasílis",
        date: "12/09/2020",
    },
]

const News = () => {
    const isIos = Platform.OS === 'ios' ? true : false;
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <Container>
            <Content isIos={isIos}>
                <Header>
                    <Icon onPress={() => goBack()}>
                        <AntDesign name="arrowleft" size={24} color="#fff" />
                    </Icon>
                    <HeaderLabel>Avisos</HeaderLabel>
                </Header>
                <ScrollView>
                    <Contracts
                        contentContainerStyle={{
                            paddingTop: 16,
                        }}
                    >
                        {
                            allNews.map((news, index) => (
                                <Contract key={index} onPress={() => {}}>
                                    <Name>{news.name}</Name>
                                    <Date>{news.date}</Date>
                                </Contract>
                            ))
                        }
                    </Contracts>
                </ScrollView>
            </Content>
        </Container>
    );
}

export default News;
