import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';

import api from '../../services';

import Container from '../../components/Container';

import {
        Content, ContentHeader, Header, Icon, HeaderLabel, Ball, Banner, BannerLabel, Graphic, MoreInfo, Label, ContentValue, Currency,
        Value, GraphicCurrency, GraphicGoal, Cards, Card, CardTitle, Contracts, Title, ContractTitle, Contract, Name, Description, Date,
        State, LabelState
} from './styles';

const Dashboard = () => {
    const metaAtual = 13000;
    const valorAtual = 3000;

    const isIos = Platform.OS === 'ios' ? true : false;
    const navigation = useNavigation();
    const [constracts, setContracts] = useState([]);
    const [goalHeight, setGoalHeight] = useState(0); //META
    const [currencyHeight, setCurrencyHeight] = useState(0); //ATUAL
    const [userName, setUserName] = useState('');
    const [token, setToken] = useState('');
    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        const getContracts = async() => {
            const getToken = await AsyncStorage.getItem('loginToken');

            if(getToken) {
                setToken(getToken);
            }

            try {
                const response = await api.get('/contracts', {
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

    useEffect(() => {
        const getUserName = async() => {
            const getName = await AsyncStorage.getItem('userName');

            if(getName) {
                setUserName(getName);
            }
        }

        getUserName();
    },[]);

    useEffect(() => {
        const getValueHeight = () => {
            const currencyX = (goalHeight * valorAtual) / metaAtual;
            const currency = ((currencyX * 100) / goalHeight).toFixed(2);

            if(currency > 100) {
                setCurrencyHeight(goalHeight);
            }else {
                setCurrencyHeight((currency * goalHeight) / 100);
            }
        }

        getValueHeight();
    }, [goalHeight, currencyHeight]);


    const goNews = () => {
        navigation.navigate('News');
    }

    const goContracts = () => {
        navigation.navigate('Contracts');
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
            <Content windowHeight={isIos}>
                <ContentHeader windowHeight={isIos ? (windowHeight / 1.20) : windowHeight}>
                    <Header>
                        <HeaderLabel>{userName}</HeaderLabel>
                        <Icon onPress={() => goNews()}>
                            <Ball />
                            <Ionicons name='md-notifications' size={30} color='#fff' />
                        </Icon>
                    </Header>
                </ContentHeader>
                <Banner onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;

                    setGoalHeight((height - 32).toFixed(2));
                }}>
                    <BannerLabel>
                        <MoreInfo>
                            <Label>Saldo Atual</Label>
                            <ContentValue>
                                <Currency>
                                    <Label currency={true}>R$</Label>
                                </Currency>
                                <Value>{valorAtual},00</Value>
                            </ContentValue>
                        </MoreInfo>
                        <MoreInfo>
                            <Label>Meta Atual</Label>
                            <ContentValue>
                                <Currency meta={true}>
                                    <Label currency={true}>R$</Label>
                                </Currency>
                                <Value>{metaAtual},00</Value>
                            </ContentValue>
                        </MoreInfo>
                    </BannerLabel>
                    <Graphic>
                        <GraphicCurrency graphicHeight={currencyHeight} />
                        <GraphicGoal graphicHeight={goalHeight} />
                    </Graphic>
                </Banner>
                <Cards>
                    <Card>
                        <CardTitle>Contratos Atuais</CardTitle>
                        <Value>13</Value>
                    </Card>
                    <Card>
                        <CardTitle>Meta Atual</CardTitle>
                        <Value>150</Value>
                    </Card>
                </Cards>
                <Contracts>
                    <Header>
                        <Title>Contratos</Title>
                        <Icon onPress={() => goContracts()}>
                            <FontAwesome name='eye' size={22} color='#41484A' />
                            <ContractTitle>Ver Todos</ContractTitle>
                        </Icon>
                    </Header>
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
                                <State>
                                    <LabelState>Ativo</LabelState>
                                </State>
                            </Contract>
                        ))
                    }
                </Contracts>
            </Content>
        </Container>
    );
}

export default Dashboard;
