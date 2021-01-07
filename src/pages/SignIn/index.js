import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import api from '../../services';

import Container from '../../components/Container';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import {
    Content,
    ContentImg,
    Img,
    Form,
    Password,
    PasswordLabel,
    Error,
    Footer,
    Contact,
    Ball,
    ContactLabel,
} from './styles';

import logo from '../../assets/logo.png';

const schema = yup.object().shape({
    login: yup.string().required('* Preencha esse campo'),
    password: yup.string().required('* Preencha esse campo'),
});

const SignIn = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(true);
    const isIos = Platform.OS === 'ios' ? true : false;
    const navigation = useNavigation();
    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    const loginSuccess = () => {
        navigation.navigate('BottomTab');
    };

    const onSubmit = (data) => {
        goPage(data);
    };

    const goPage = async (data) => {
        setButtonVisible(false);

        try {
            const response = await api.post('/session', {
                ...data,
            });

            const fullName = response.data.user.name.split(' ');
            const name = `${fullName[0]} ${fullName[fullName.length - 1]}`;

            AsyncStorage.setItem('loginToken', response.data.token);
            AsyncStorage.setItem('userName', name);

            loginSuccess();
        } catch (err) {
            console.log('ERRO: ', err);

            setModalVisible(true);
        }

        setButtonVisible(true);
    };

    return (
        <Container>
            {!modalVisible ? (
                <Content isIos={isIos}>
                    <ContentImg>
                        <Img source={logo} resizeMode="contain" />
                    </ContentImg>
                    <Form>
                        <Input
                            label={'E-mail ou CPF'}
                            name={'login'}
                            control={control}
                        />
                        {errors.login && <Error>{errors.login.message}</Error>}

                        <Input
                            label={'Senha'}
                            name={'password'}
                            control={control}
                        />
                        {errors.password && (
                            <Error>{errors.password.message}</Error>
                        )}

                        <Password onPress={() => {}}>
                            <PasswordLabel>Esqueci a senha!</PasswordLabel>
                        </Password>
                    </Form>
                    <Contact onPress={() => {}}>
                        <Ball />
                        <ContactLabel>Dúvidas? Fale conosco.</ContactLabel>
                    </Contact>
                    <Footer>
                        <Button
                            label={'Entrar'}
                            reverse={true}
                            onPress={handleSubmit(onSubmit)}
                            disabled={!buttonVisible}
                            show={!buttonVisible}
                        />
                    </Footer>
                </Content>
            ) : (
                <Modal
                    visible={modalVisible}
                    message={'Não localizei seu cadastro, tente novamente!'}
                    label={'Voltar'}
                    setModalVisible={setModalVisible}
                />
            )}
        </Container>
    );
};

export default SignIn;
