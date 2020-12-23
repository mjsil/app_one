import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';
import intl from 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import api from '../../services';

import Container from '../../components/Container';

import {
    Content,
    ContentHeader,
    Header,
    Icon,
    HeaderLabel,
    Ball,
    Banner,
    BannerLabel,
    Graphic,
    MoreInfo,
    Label,
    ContentValue,
    Currency,
    Value,
    GraphicCurrency,
    GraphicGoal,
    Cards,
    Card,
    CardTitle,
    Infos,
    Title,
    ContractTitle,
    Info,
    Name,
    Description,
    Date,
    State,
    LabelState,
} from './styles';

const Dashboard = () => {
    const metaAtual = 13000;

    const windowHeight = Dimensions.get('window').height;
    const isIos = Platform.OS === 'ios' ? true : false;
    const navigation = useNavigation();

    const [contracts, setContracts] = useState([]);
    const [contractsCurrent, setContractsCurrent] = useState([]);
    const [prospections, setProspections] = useState([]);
    const [goalHeight, setGoalHeight] = useState(0); //META
    const [userName, setUserName] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const getAllContractsCurrent = async () => {
            try {
                const response = await api.get('/contracts/date', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setContractsCurrent(response.data.Contracts);
            } catch (err) {
                console.log('ERRO: ', err);

                //COLOLAR MODAL QUE NÃO ENCONTROU OS CONTRATOS
            }
        };

        getAllContractsCurrent();
    }, [token]);

    useEffect(() => {
        const getContracts = async () => {
            try {
                const response = await api.get('/contracts', {
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

    useEffect(() => {
        const getProspections = async () => {
            try {
                const response = await api.get('/prospections', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProspections(response.data.Prospections);
            } catch (err) {
                console.log('ERRO: ', err);

                //COLOLAR MODAL QUE NÃO ENCONTROU PROSPECÇÕES
            }
        };

        getProspections();
    }, [token]);

    useEffect(() => {
        const getUserName = async () => {
            const getName = await AsyncStorage.getItem('userName');
            const getToken = await AsyncStorage.getItem('loginToken');

            if (getName) {
                setUserName(getName);
            }

            if (getToken) {
                setToken(getToken);
            }
        };

        getUserName();
    }, []);

    const totalContracts = useMemo(() => {
        const total = contractsCurrent.reduce((accumulator, current, index) => {
            return index + 1;
        }, 0);

        return total;
    }, [contractsCurrent]);

    const totalMoney = useMemo(() => {
        const total = contractsCurrent.reduce((accumulator, current) => {
            return accumulator + current.VALORTOTAL;
        }, 0);

        return new Intl.NumberFormat('pt-BR').format(total);
    }, [contractsCurrent]);

    const currencyHeight = useMemo(() => {
        const currencyX =
            (goalHeight *
                parseFloat(totalMoney.replace('.', '').replace(',', '.'))) /
            metaAtual;
        const currency = ((currencyX * 100) / goalHeight).toFixed(2);

        if (currency > 100) {
            return goalHeight;
        }

        return (currency * goalHeight) / 100;
    }, [contractsCurrent]);

    const goNews = () => {
        navigation.navigate('News');
    };

    const goContracts = () => {
        navigation.navigate('Contracts');
    };

    const goProspections = () => {
        navigation.navigate('Prospections');
    };

    const goContractInfo = (contract) => {
        navigation.navigate('More', {
            info: {
                ...contract,
                contract: true,
            },
        });
    };

    const goProspectionInfo = (prospection) => {
        navigation.navigate('More', {
            info: {
                ...prospection,
                prospection: true,
            },
        });
    };

    return (
        <Container>
            <Content windowHeight={isIos}>
                <ContentHeader
                    windowHeight={isIos ? windowHeight / 1.2 : windowHeight}
                >
                    <Header>
                        <HeaderLabel>{userName}</HeaderLabel>
                        <Icon onPress={() => goNews()}>
                            <Ball />
                            <Ionicons
                                name="md-notifications"
                                size={30}
                                color="#fff"
                            />
                        </Icon>
                    </Header>
                </ContentHeader>
                <Banner
                    onLayout={(event) => {
                        const { height } = event.nativeEvent.layout;

                        setGoalHeight((height - 32).toFixed(2));
                    }}
                >
                    <BannerLabel>
                        <MoreInfo>
                            <Label>Saldo Atual</Label>
                            <ContentValue>
                                <Currency>
                                    <Label currency={true}>R$</Label>
                                </Currency>
                                <Value>{totalMoney}</Value>
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
                        <Value>{totalContracts}</Value>
                    </Card>
                    <Card>
                        <CardTitle>Meta Atual</CardTitle>
                        <Value>150</Value>
                    </Card>
                </Cards>
                <Infos>
                    <Header>
                        <Title>Contratos</Title>
                        <Icon onPress={() => goContracts()}>
                            <FontAwesome name="eye" size={22} color="#41484A" />
                            <ContractTitle>Ver Todos</ContractTitle>
                        </Icon>
                    </Header>
                    {contracts.map((contract, index) => (
                        <Info
                            key={index}
                            onPress={() => goContractInfo(contract)}
                        >
                            <Description>
                                <Name>Código: {contract.CODCONTRATO}</Name>
                                <Date>
                                    Data:
                                    {format(
                                        parseISO(contract.DATAINICIO),
                                        " dd 'de' MMMM 'de' yyyy'",
                                        {
                                            locale: ptBR,
                                        }
                                    )}
                                </Date>
                            </Description>
                            <State cod={2}>
                                <LabelState>Ativo</LabelState>
                            </State>
                        </Info>
                    ))}
                </Infos>
                <Infos>
                    <Header>
                        <Title>Prospecções</Title>
                        <Icon onPress={() => goProspections()}>
                            <FontAwesome name="eye" size={22} color="#41484A" />
                            <ContractTitle>Ver Todas</ContractTitle>
                        </Icon>
                    </Header>
                    {prospections.map((prospection, index) => (
                        <Info
                            key={index}
                            onPress={() => goProspectionInfo(prospection)}
                            prospection={true}
                        >
                            <Description>
                                <Name>Empresa: {prospection.EMPRESA}</Name>
                                <Date>
                                    Data:
                                    {format(
                                        parseISO(prospection.DATACADASTRO),
                                        " dd 'de' MMMM 'de' yyyy'",
                                        {
                                            locale: ptBR,
                                        }
                                    )}
                                </Date>
                            </Description>
                            <State
                                prospection={true}
                                style={{ width: '100%' }}
                                cod={prospection.CODSTATUSPROSPECCAO}
                            >
                                <LabelState>
                                    {prospection.CODSTATUSPROSPECCAO === 1
                                        ? 'Em Digitação'
                                        : prospection.CODSTATUSPROSPECCAO === 2
                                        ? 'Contrato Gerado'
                                        : prospection.CODSTATUSPROSPECCAO === 3
                                        ? 'Cliente Desistiu'
                                        : 'Sem Status'}
                                </LabelState>
                            </State>
                        </Info>
                    ))}
                </Infos>
            </Content>
        </Container>
    );
};

export default Dashboard;
