import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import Container from '../../components/Container';
import Button from '../../components/Button';

import { Content, Img } from './styles';

import logo from '../../assets/logo.png';

const Home = () => {
    const navigation = useNavigation();
    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        const sessionExits = async() => {
            const getName = await AsyncStorage.getItem('userName');
            const getToken = await AsyncStorage.getItem('loginToken');

            if(getName && getToken) {
                navigation.navigate('BottomTab');
            }
        }

        sessionExits();
    },[]);

    const goNextPage = (namePage) => {
        navigation.navigate(namePage);
    }

    return (
        <Container>
            <Content>
                <Img source={logo} resizeMode='contain'  windowHeight={windowHeight} />
                <Button
                    label={'Entrar'}
                    onPress={() => goNextPage('SignIn')}
                />
                <Button
                    label={'Cadastro'}
                    onPress={() => goNextPage('SignUp')}
                />
            </Content>
        </Container>
    );
}

export default Home;
