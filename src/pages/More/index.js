import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';

import api from '../../services';
import { base_url } from '../../services/1net';

import Zoom from './zoom';
import Container from '../../components/Container';

import {
    Content, Header, Icon, HeaderLabel, Contracts, Contract, Description, Img, Info, ContentInfo, Label, Value, Espace, State, LabelState
} from './styles';

const MoreInfo = () => {
    const isIos = Platform.OS === 'ios' ? true : false;
    const navigation = useNavigation();
    const router = useRoute();
    const [fullInfo, setFullInfo] = useState({});
    const [viewZoom, setViewZoom] = useState(false);
    const [isContract, setIsContract] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        setFullInfo(router.params.info);

        if(router.params.info.contract) {
            setIsContract(true);
        }
    },[]);

    useEffect(() => {
        const getCompany = async() => {
            const getToken = await AsyncStorage.getItem('loginToken');

            if(getToken) {
                setToken(getToken);
            }

            try {
                const response = await api.get(`/company/${fullInfo.CODPROSPECCAO}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setFullInfo({
                    ...fullInfo,
                    company: response.data.Empresa
                });
            } catch(err) {
                console.log('ERRO: ', err);
            }
        }

        isContract && getCompany();
    }, [token, fullInfo]);

    const goBack = () => {
        viewZoom ? setViewZoom(viewZoom => !viewZoom) : navigation.goBack();
    }

    const showZoom = () => {
        setViewZoom(viewZoom => !viewZoom);
    }

    return (
        <Container>
            <Content isIos={isIos}>
                <Header>
                    <Icon onPress={() => goBack()}>
                        <AntDesign name="arrowleft" size={24} color="#fff" />
                    </Icon>
                    <HeaderLabel>{isContract ? fullInfo.CODCONTRATO : fullInfo.eventname}</HeaderLabel>
                </Header>
                <ScrollView>
                    <Contracts viewZoom={viewZoom}
                        contentContainerStyle={{
                            paddingTop: 16,
                        }}
                    >
                        {   !isContract
                            ?   <Contract viewZoom={viewZoom}>
                                    { !viewZoom
                                        ?   <>
                                                <TouchableOpacity onPress={() => showZoom()}>
                                                    <Img
                                                        resizeMode="contain"
                                                        source={{
                                                            uri: `${base_url}/files/${fullInfo.filename}`,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                <Description>{fullInfo.eventdescription}</Description>
                                            </>
                                        :
                                            <Zoom Uri={`${base_url}/files/${fullInfo.filename}`} Token={router.params.token} />
                                    }
                                </Contract>
                            :   <Contract>
                                    <Espace />
                                    <Label>cliente:
                                        <Value>{' '}{fullInfo.company ? fullInfo.company : fullInfo.CNPJCLIENTE}</Value>
                                    </Label>
                                    <Espace />
                                    <Label>Contrato:
                                        <Value>
                                            {format(parseISO(fullInfo.DATACONTRATO),
                                                " dd 'de' MMMM 'de' yyyy'",{
                                                    locale: ptBR
                                                }
                                            )}
                                        </Value>
                                    </Label>
                                    <Label>Início:
                                        <Value>
                                            {format(parseISO(fullInfo.DATAINICIO),
                                                " dd 'de' MMMM 'de' yyyy'",{
                                                    locale: ptBR
                                                }
                                            )}
                                        </Value>
                                    </Label>
                                    <Espace />
                                    <Label>Carência:
                                            <Value>{' '}{fullInfo.QTDMESESCARENCIA}{' meses'}</Value>
                                    </Label>
                                    <Espace />
                                    <Espace />
                                    <Info>
                                        <ContentInfo>
                                            <Label>Valor</Label>
                                            <Value>R$ {fullInfo.VALORCONTRATO}</Value>
                                        </ContentInfo>
                                        <ContentInfo>
                                            <Label>Aditivo</Label>
                                            <Value>R$ {fullInfo.VALORADITIVO}</Value>
                                        </ContentInfo>
                                        <ContentInfo>
                                            <Label>Total</Label>
                                            <Value>R$ {fullInfo.VALORTOTAL}</Value>
                                        </ContentInfo>
                                    </Info>
                                    <Espace />
                                    <Espace />
                                    <Label>Indicador:
                                        <Value>{' '}{fullInfo.CNPJINDICADOR}</Value>
                                    </Label>
                                    <Espace />
                                    <Espace />
                                    <Label>
                                        Obs:{' '}
                                        <Value>{fullInfo.OBS}</Value>
                                    </Label>
                                    <Espace />
                                    <State cod={fullInfo.CODSITUACAO}>
                                        <LabelState>{
                                            ((fullInfo.CODSITUACAO === 2001) || (fullInfo.CODSITUACAO === 3001))
                                            ?   'Cancelado'
                                            :   ((fullInfo.CODSITUACAO === 1001) || (fullInfo.CODSITUACAO === 4001))
                                            ?   'Ativo'
                                            :   ((fullInfo.CODSITUACAO === 5001) || (fullInfo.CODSITUACAO === 8001))
                                            ?   'Suspenso'
                                            :   fullInfo.CODSITUACAO === 6001
                                            ?   'Jurídico'
                                            :   fullInfo.CODSITUACAO === 7001
                                            ?   'Concluido'
                                            :   'Sem Status'
                                        }</LabelState>
                                    </State>
                                </Contract>
                        }
                    </Contracts>
                </ScrollView>
            </Content>
        </Container>
    );
}

export default MoreInfo;
