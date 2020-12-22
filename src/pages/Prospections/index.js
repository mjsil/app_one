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
        Content, Header, Icon, HeaderLabel, ContentHeader, Title, IconContent, ProspectionTitle, AllProspections, Prospection, Name, Description, Date,
        State, LabelState
} from './styles';

const Prospections = () => {
    const isIos = Platform.OS === 'ios' ? true : false;
    const navigation = useNavigation();
    const [prospections, setProspections] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        const getProspections = async() => {
            const getToken = await AsyncStorage.getItem('loginToken');

            if(getToken) {
                setToken(getToken);
            }

            try {
                const response = await api.get('/all/prospections', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProspections(response.data.Prospections);
            } catch(err) {
                console.log('ERRO: ', err);

                //COLOLAR MODAL QUE NÃO ENCONTROU OS CONTRATOS
            }
        }

        getProspections();
    }, [token]);

    const goBack = () => {
        navigation.goBack();
    }

    const goProspectionInfo = (prospection) => {
        navigation.navigate('More', {
            info: {
                ...prospection,
                prospection: true,
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
                    <HeaderLabel>Prospecções</HeaderLabel>
                </Header>
                <ContentHeader>
                    <Title>Filtro</Title>
                    <IconContent onPress={() => {}}>
                        <FontAwesome name='filter' size={22} color='#41484A' />
                        <ProspectionTitle>Filtrar</ProspectionTitle>
                    </IconContent>
                </ContentHeader>
                <ScrollView>
                    <AllProspections>
                        {
                            prospections.map((prospection, index) => (
                                <Prospection key={index} onPress={() => goProspectionInfo(prospection)}>
                                    <Description>
                                        <Name>Empresa: {prospection.EMPRESA}</Name>
                                        <Date>Data:
                                            {format(parseISO(prospection.DATACADASTRO),
                                                " dd 'de' MMMM 'de' yyyy'",{
                                                    locale: ptBR
                                                }
                                            )}
                                        </Date>
                                    </Description>
                                    <State cod={prospection.CODSTATUSPROSPECCAO}>
                                        <LabelState>
                                            {
                                                (prospection.CODSTATUSPROSPECCAO === 1)
                                                ?   'Em Digitação'
                                                :   (prospection.CODSTATUSPROSPECCAO === 2)
                                                ?   'Contrato Gerado'
                                                :   (prospection.CODSTATUSPROSPECCAO === 3)
                                                ?   'Cliente Desistiu'
                                                :   'Sem Status'
                                            }
                                        </LabelState>
                                    </State>
                                </Prospection>
                            ))
                        }
                    </AllProspections>
                </ScrollView>
            </Content>
        </Container>
    );
}

export default Prospections;
