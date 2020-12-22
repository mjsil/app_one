import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';

import api from '../../services';

import Container from '../../components/Container';

import {
        Content, Header, Icon, HeaderLabel, ContentHeader, Title, IconContent, ContractTitle, AllContracts, Contract, Name, Description, Date,
        State, LabelState
} from './styles';

const Contracts = () => {
    const isIos = Platform.OS === 'ios' ? true : false;
    const navigation = useNavigation();
    const [constracts, setContracts] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        const getContracts = async() => {
            const getToken = await AsyncStorage.getItem('loginToken');

            if(getToken) {
                setToken(getToken);
            }

            try {
                const response = await api.get('/all/contracts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setContracts(response.data.Contracts);
            } catch(err) {
                console.log('ERRO: ', err);

                //COLOLAR MODAL QUE NÃO ENCONTROU OS CONTRATOS
            }
        }

        getContracts();
    }, [token]);

    const goBack = () => {
        navigation.goBack();
    }

    const goContractInfo = (contract) => {
        navigation.navigate('More', {
            info: {
                ...contract,
                contract: true,
            }
        });
    }

    return (
        <Container>
            <Content isIos={isIos}>
                <Header>
                    <Icon onPress={() => goBack()}>
                        <AntDesign name='arrowleft' size={24} color='#fff' />
                    </Icon>
                    <HeaderLabel>Contratos</HeaderLabel>
                </Header>
                <ContentHeader>
                    <Title>Filtro</Title>
                    <IconContent onPress={() => {}}>
                        <FontAwesome name='filter' size={22} color='#41484A' />
                        <ContractTitle>Filtrar</ContractTitle>
                    </IconContent>
                </ContentHeader>
                <ScrollView>
                    <AllContracts>
                        {
                            constracts.map((contract, index) => (
                                <Contract key={index} onPress={() => goContractInfo(contract)}>
                                    <Description>
                                        <Name>Código: {contract.CODCONTRATO}</Name>
                                        <Date>Data:
                                            {format(parseISO(contract.DATAINICIO),
                                                " dd 'de' MMMM 'de' yyyy'",{
                                                    locale: ptBR
                                                }
                                            )}
                                        </Date>
                                    </Description>
                                    <State cod={contract.CODSITUACAO}>
                                        <LabelState>{
                                            ((contract.CODSITUACAO === 2001) || (contract.CODSITUACAO === 3001))
                                            ?   'Cancelado'
                                            :   ((contract.CODSITUACAO === 1001) || (contract.CODSITUACAO === 4001))
                                            ?   'Ativo'
                                            :   ((contract.CODSITUACAO === 5001) || (contract.CODSITUACAO === 8001))
                                            ?   'Suspenso'
                                            :   contract.CODSITUACAO === 6001
                                            ?   'Jurídico'
                                            :   contract.CODSITUACAO === 7001
                                            ?   'Concluido'
                                            :   'Sem Status'
                                        }</LabelState>
                                    </State>
                                </Contract>
                            ))
                        }
                    </AllContracts>
                </ScrollView>
            </Content>
        </Container>
    );
}

export default Contracts;
