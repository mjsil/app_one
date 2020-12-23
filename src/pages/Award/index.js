import React, { useState, useEffect } from 'react';
import { ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services';

import Container from '../../components/Container';

import {
    ContentFull,
    Header,
    HeaderLabel,
    Contracts,
    Contract,
    ContentName,
    Card,
    CardLabel,
    Name,
    Content,
    ContentValue,
    Label,
    Value,
} from './styles';

const allNews = [
    {
        contrato: '14523214547854125412',
        date: '12/09/2020',
        valor: 'R$ 500,00',
        pago: false,
    },
    {
        contrato: '14523214547854125412',
        date: '12/09/2020',
        valor: 'R$ 500,00',
        pago: false,
    },
    {
        contrato: '14523214547854125412',
        date: '12/09/2020',
        valor: 'R$ 500,00',
        pago: true,
    },
    {
        contrato: '14523214547854125412',
        date: '12/09/2020',
        valor: 'R$ 500,00',
        pago: true,
    },
    {
        contrato: '14523214547854125412',
        date: '12/09/2020',
        valor: 'R$ 500,00',
        pago: true,
    },
    {
        contrato: '14523214547854125412',
        date: '12/09/2020',
        valor: 'R$ 500,00',
        pago: true,
    },
];

const Award = () => {
    const isIos = Platform.OS === 'ios' ? true : false;

    const [contracts, setContracts] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        const getUserName = async () => {
            const getToken = await AsyncStorage.getItem('loginToken');

            if (getToken) {
                setToken(getToken);
            }
        };

        getUserName();
    }, []);

    useEffect(() => {
        const getContracts = async () => {
            try {
                const response = await api.get('/all/contracts/active', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setContracts(response.data.Contracts);
            } catch (err) {
                console.log('ERRO: ', err);

                //COLOLAR MODAL QUE NÃO ENCONTROU OS CONTRATOS
            }
        };

        getContracts();
    }, [token]);

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
                        {allNews.map((news, index) => (
                            <Contract key={index} onPress={() => {}}>
                                <ContentName>
                                    <Label>Cliente: </Label>
                                    <Name>{news.contrato}</Name>
                                </ContentName>
                                <ContentName>
                                    <Label>Contrato: </Label>
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
                                    <CardLabel>
                                        {news.pago
                                            ? 'Pagamento Efetuado'
                                            : 'Aguarde Pagamento'}
                                    </CardLabel>
                                </Card>
                            </Contract>
                        ))}
                    </Contracts>
                </ScrollView>
            </ContentFull>
        </Container>
    );
};

export default Award;
