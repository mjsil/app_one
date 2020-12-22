import React, { useState, useEffect } from 'react';
import { ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Container from '../../components/Container';

import {
        ContentFull, Header, HeaderLabel, Contracts, Contract, ContentName, Card, CardLabel, Name, Content, ContentValue, Label, Value
} from './styles';

const allNews = [
    {
        contrato: "14523214547854125412",
        date: "12/09/2020",
        valor: "R$ 500,00",
        pago: false
    },
    {
        contrato: "14523214547854125412",
        date: "12/09/2020",
        valor: "R$ 500,00",
        pago: false
    },
    {
        contrato: "14523214547854125412",
        date: "12/09/2020",
        valor: "R$ 500,00",
        pago: true
    },
    {
        contrato: "14523214547854125412",
        date: "12/09/2020",
        valor: "R$ 500,00",
        pago: true
    },
    {
        contrato: "14523214547854125412",
        date: "12/09/2020",
        valor: "R$ 500,00",
        pago: true
    },
    {
        contrato: "14523214547854125412",
        date: "12/09/2020",
        valor: "R$ 500,00",
        pago: true
    },
]

const Award = () => {
    const isIos = Platform.OS === 'ios' ? true : false;
    const navigation = useNavigation();

    return (
        <Container>
            <ContentFull isIos={isIos}>
                <Header>
                    <HeaderLabel>Premiação</HeaderLabel>
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
                                    <ContentName>
                                        <Label>contrato: </Label>
                                        <Name>{news.contrato}</Name>
                                    </ContentName>
                                    <Content>
                                        <ContentValue>
                                            <Label>Valor</Label>
                                            <Value>{news.valor}</Value>
                                        </ContentValue>
                                        <ContentValue>
                                            <Label>Disponível</Label>
                                            <Value>{news.date}</Value>
                                        </ContentValue>
                                    </Content>
                                    <Card pago={news.pago}>
                                        <CardLabel>{news.pago ? "Pagamento Efetuado" : "Aguarde Pagamento"}</CardLabel>
                                    </Card>
                                </Contract>
                            ))
                        }
                    </Contracts>
                </ScrollView>
            </ContentFull>
        </Container>
    );
}

export default Award;
