import React, { useEffect, useState } from 'react';
import { ScrollView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';

import { base_url } from '../../services/1net';

import Zoom from './zoom';
import Container from '../../components/Container';

import {
    Content,
    Header,
    Icon,
    HeaderLabel,
    FullContent,
    Infos,
    Description,
    Img,
    Info,
    ContentInfo,
    Label,
    Value,
    Espace,
    State,
    LabelState,
} from './styles';

const MoreInfo = () => {
    const isIos = Platform.OS === 'ios' ? true : false;
    const navigation = useNavigation();
    const router = useRoute();
    const [fullInfo, setFullInfo] = useState({});
    const [viewZoom, setViewZoom] = useState(false);
    const [isContract, setIsContract] = useState(false);
    const [isProspection, setIsProspection] = useState(false);

    useEffect(() => {
        setFullInfo(router.params.info);

        if (router.params.info.prospection) {
            setIsProspection(true);
            setIsContract(false);
        }

        if (router.params.info.contract) {
            setIsProspection(false);
            setIsContract(true);
        }
    }, []);

    const goBack = () => {
        viewZoom ? setViewZoom((viewZoom) => !viewZoom) : navigation.goBack();
    };

    const showZoom = () => {
        setViewZoom((viewZoom) => !viewZoom);
    };

    return (
        <Container>
            <Content isIos={isIos}>
                <Header>
                    <Icon onPress={() => goBack()}>
                        <AntDesign name="arrowleft" size={24} color="#fff" />
                    </Icon>
                    <HeaderLabel>
                        {isContract
                            ? fullInfo.CODCONTRATO
                            : isProspection
                            ? fullInfo.CODPROSPECCAO
                            : fullInfo.eventname}
                    </HeaderLabel>
                </Header>
                <ScrollView>
                    <FullContent
                        viewZoom={viewZoom}
                        contentContainerStyle={{
                            paddingTop: 16,
                        }}
                    >
                        {isContract ? (
                            <Infos>
                                <Espace />
                                <Label>
                                    Cliente:
                                    <Value>
                                        {' '}
                                        {fullInfo.RAZAOSOCIAL ||
                                            fullInfo.CNPJCLIENTE}
                                    </Value>
                                </Label>
                                <Espace />
                                <Label>
                                    Contrato:
                                    <Value>
                                        {format(
                                            parseISO(fullInfo.DATACONTRATO),
                                            " dd 'de' MMMM 'de' yyyy'",
                                            {
                                                locale: ptBR,
                                            }
                                        )}
                                    </Value>
                                </Label>
                                <Label>
                                    Início:
                                    <Value>
                                        {format(
                                            parseISO(fullInfo.DATAINICIO),
                                            " dd 'de' MMMM 'de' yyyy'",
                                            {
                                                locale: ptBR,
                                            }
                                        )}
                                    </Value>
                                </Label>
                                <Espace />
                                <Label>
                                    Carência:
                                    <Value>
                                        {' '}
                                        {fullInfo.QTDMESESCARENCIA}
                                        {' meses'}
                                    </Value>
                                </Label>
                                <Espace />
                                <Espace />
                                <Info>
                                    <ContentInfo>
                                        <Label>Valor</Label>
                                        <Value>
                                            R$ {fullInfo.VALORCONTRATO}
                                        </Value>
                                    </ContentInfo>
                                    <ContentInfo>
                                        <Label>Aditivo</Label>
                                        <Value>
                                            R$ {fullInfo.VALORADITIVO}
                                        </Value>
                                    </ContentInfo>
                                    <ContentInfo>
                                        <Label>Total</Label>
                                        <Value>R$ {fullInfo.VALORTOTAL}</Value>
                                    </ContentInfo>
                                </Info>
                                <Espace />
                                <Espace />
                                <Label>
                                    Indicador:
                                    <Value> {fullInfo.CNPJINDICADOR}</Value>
                                </Label>
                                <Espace />
                                <Espace />
                                <Label>
                                    Obs: <Value>{fullInfo.OBS}</Value>
                                </Label>
                                <Espace />
                                <State cod={fullInfo.CODSITUACAO}>
                                    <LabelState>
                                        {fullInfo.CODSITUACAO === 2001 ||
                                        fullInfo.CODSITUACAO === 3001
                                            ? 'Cancelado'
                                            : fullInfo.CODSITUACAO === 1001 ||
                                              fullInfo.CODSITUACAO === 4001
                                            ? 'Ativo'
                                            : fullInfo.CODSITUACAO === 5001 ||
                                              fullInfo.CODSITUACAO === 8001
                                            ? 'Suspenso'
                                            : fullInfo.CODSITUACAO === 6001
                                            ? 'Jurídico'
                                            : fullInfo.CODSITUACAO === 7001
                                            ? 'Concluido'
                                            : 'Sem Status'}
                                    </LabelState>
                                </State>
                            </Infos>
                        ) : isProspection ? (
                            <Infos>
                                <Espace />
                                <Label>
                                    Cliente:
                                    <Value>
                                        {' '}
                                        {fullInfo.RAZAOSOCIAL ||
                                            fullInfo.CODPROSPECCAO}
                                    </Value>
                                </Label>
                                <Espace />
                                <Label>
                                    Cadastro:
                                    <Value>
                                        {format(
                                            parseISO(fullInfo.DATACADASTRO),
                                            " dd 'de' MMMM 'de' yyyy'",
                                            {
                                                locale: ptBR,
                                            }
                                        )}
                                    </Value>
                                </Label>
                                <Espace />
                                <Espace />
                                <Info>
                                    <ContentInfo>
                                        <Label>Inicial</Label>
                                        <Value>
                                            R$ {fullInfo.VALORINICIAL}
                                        </Value>
                                    </ContentInfo>
                                    <ContentInfo>
                                        <Label>Final</Label>
                                        <Value>R$ {fullInfo.VALORFINAL}</Value>
                                    </ContentInfo>
                                    <ContentInfo>
                                        <Label>Elevadores</Label>
                                        <Value>{fullInfo.QTDELEVADORES}</Value>
                                    </ContentInfo>
                                </Info>
                                <Espace />
                                <Espace />
                                <Label>
                                    Obs: <Value>{fullInfo.OBS}</Value>
                                </Label>
                                <Espace />
                                <Espace />
                                <State cod={fullInfo.CODSTATUSPROSPECCAO}>
                                    <LabelState>
                                        {fullInfo.CODSTATUSPROSPECCAO === 1
                                            ? 'Em Digitação'
                                            : fullInfo.CODSTATUSPROSPECCAO === 2
                                            ? 'Contrato Gerado'
                                            : fullInfo.CODSTATUSPROSPECCAO === 3
                                            ? 'Cliente Desistiu'
                                            : 'Sem Status'}
                                    </LabelState>
                                </State>
                            </Infos>
                        ) : (
                            <Infos viewZoom={viewZoom}>
                                {!viewZoom ? (
                                    <>
                                        <TouchableOpacity
                                            onPress={() => showZoom()}
                                        >
                                            <Img
                                                resizeMode="contain"
                                                source={{
                                                    uri: `${base_url}/files/${fullInfo.filename}`,
                                                }}
                                            />
                                        </TouchableOpacity>
                                        <Description>
                                            {fullInfo.eventdescription}
                                        </Description>
                                    </>
                                ) : (
                                    <Zoom
                                        Uri={`${base_url}/files/${fullInfo.filename}`}
                                        Token={router.params.token}
                                    />
                                )}
                            </Infos>
                        )}
                    </FullContent>
                </ScrollView>
            </Content>
        </Container>
    );
};

export default MoreInfo;
