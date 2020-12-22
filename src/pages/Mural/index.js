import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';

import api from '../../services/1net';
import dataInstitution from '../../services/credentials';

import Container from '../../components/Container';

import {
        Content, Header, HeaderLabel, Contracts, Contract, MuralHeader, Name, Date, Description
} from './styles';

const Mural = () => {
    const navigation = useNavigation();
    const [allMurals, setAllMurals] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        const searchToken = async() => {
            const getToken = await AsyncStorage.getItem('token');

            if(getToken) {
                setToken(getToken);
            }
        }

        searchToken();
    },[]);

    useEffect(() => {
        const getMurals = async() => {
            try {
                const response = await api.get(`/murals/${dataInstitution.institutionId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setAllMurals(response.data);
            } catch(err) {
                console.log('ERRO: ', err);

                //COLOLAR MODAL QUE NÃO ENCONTROU DADOS DO MURAL
            }
        }

        getMurals();
    },[token]);

    const goMoreInfo = (moreInformations) => {
        navigation.navigate('More', {
            info: moreInformations,
        });
    }

    return (
        <Container>
            <Content>
                <Header>
                    <HeaderLabel>Mural</HeaderLabel>
                </Header>
                <Contracts
                    contentContainerStyle={{
                        paddingTop: 16,
                    }}
                >
                    {
                        allMurals.map((mural, index) => (
                            <Contract key={index} onPress={() => goMoreInfo(mural)}>
                                <MuralHeader>
                                    <Name>{mural.eventname}</Name>
                                    <Date>
                                        {format(parseISO(mural.createdAt),
                                            "dd 'de' MMMM 'de' yyyy",{
                                                locale: ptBR
                                            }
                                        )}
                                    </Date>
                                </MuralHeader>
                                <Description>
                                    {mural.eventdescription}
                                </Description>
                            </Contract>
                        ))
                    }
                </Contracts>
            </Content>
        </Container>
    );
}

export default Mural;
