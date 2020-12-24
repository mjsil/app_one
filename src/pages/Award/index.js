import React, { useState, useEffect } from 'react';
import { ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import intl from 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { addMonths, isBefore, parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';

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
import addDays from 'date-fns/addDays';

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
    const isBeforeDate = [];

    useEffect(() => {
        const getLocalStorage = async () => {
            const getToken = await AsyncStorage.getItem('loginToken');

            if (getToken) {
                setToken(getToken);
            }
        };

        getLocalStorage();
    }, []);

    useEffect(() => {
        const getContracts = async () => {
            try {
                const response = await api.get('/all/contracts', {
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

    const checkDateContract = (contract) => {
        const date = new Date(contract.DATAINICIO);
        const newDate = addDays(addMonths(date, contract.QTDMESESCARENCIA), 1);

        const fullDate = addMonths(newDate, newDate.getDate() <= 15 ? 1 : 2);

        const newFullDate = new Date(
            `${fullDate.getFullYear()}/${
                `${fullDate.getMonth() + 1}`.length < 2
                    ? `0${fullDate.getMonth() + 1}`
                    : fullDate.getMonth() + 1
            }/15`
        );

        const checkIsAfter = isBefore(newFullDate, new Date());

        isBeforeDate.push(checkIsAfter);

        return format(newFullDate, 'dd/MM/yyyy', {
            locale: ptBR,
        });
    };

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
                        {contracts.map((contract, index) => (
                            <Contract key={index} onPress={() => {}}>
                                <ContentName>
                                    <Label>Cliente: </Label>
                                    <Name>{contract.RAZAOSOCIAL}</Name>
                                </ContentName>
                                <ContentName>
                                    <Label>Contrato: </Label>
                                    <Name>{contract.CODCONTRATO}</Name>
                                </ContentName>
                                <Content>
                                    <ContentValue>
                                        <Label>Valor</Label>
                                        <Value>
                                            R${' '}
                                            {new Intl.NumberFormat(
                                                'pt-BR'
                                            ).format(
                                                (
                                                    contract.VALORTOTAL / 2
                                                ).toFixed(2)
                                            )}
                                        </Value>
                                    </ContentValue>
                                    <ContentValue>
                                        <Label>Disponível</Label>
                                        <Value>
                                            {checkDateContract(contract)}
                                        </Value>
                                    </ContentValue>
                                </Content>
                                <Card pago={isBeforeDate[index]}>
                                    <CardLabel>
                                        {isBeforeDate[index]
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
