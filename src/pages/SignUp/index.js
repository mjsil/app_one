import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import CheckboxFormX from 'react-native-checkbox-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import api from '../../services';

import Container from '../../components/Container';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import Modal from '../../components/Modal';

import { Content, ContentImg, Img, Form, Error, Footer, ContainerCheck, ContentTermos, Termos } from './styles';

import logo from '../../assets/logo.png';

const schema = yup.object().shape({
    nome: yup.string().min(3, '* Nome inválido').required('* Preencha esse campo'),
    email: yup.string().email('* E-mail inválido').required('* Preencha esse campo'),
    telefone: yup.string().min(10, '* Telefone inválido').required('* Preencha esse campo'),
    cpf: yup.string().required('* Preencha esse campo'),
    senha: yup.string().required('* Preencha esse campo'),
    confirmacao: yup.string().oneOf([yup.ref('senha'), null], '* As senhas não correspondem'),
});


const mockData = [
    {
        label: 'Li e concordo com os termos de uso',
        RNchecked: false
    },
];

const SignUp = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [messageModal, setMessageModal] = useState('');
    const isIos = Platform.OS === 'ios' ? true : false;
    const navigation = useNavigation();
    const [isCheck, setIsCheck] = useState(false);
    const [selectErro, setSelectErro] = useState(false);
    const [selectFilial, setSelectFilial] = useState('');
    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });

    const loginSuccess = async(newData) => {
        try {
            await api.post('/create/user', {
                ...newData
            });

            setMessageModal('Cadastro realizado com sucesso! Agora faça login.');
            setModalVisible(true);
        } catch(err) {
            setMessageModal('Acho que você já possui cadastro! Faça login.');
            setModalVisible(true);

            console.log('ERRO: ', err);
        }

        navigation.navigate('SignIn');
    }

    const onSubmit = (data) => {
        if(selectFilial === '') {
            setSelectErro(true);

            return;
        }

        const newData = {
            name: data.nome,
            email: data.email,
            password: data.senha,
            phone: data.telefone.replace(/\D/g, "").substring(0, 11),
            cpf: data.cpf.replace(/\D/g, "").substring(0, 11),
            filial: selectFilial
        }

        loginSuccess(newData);
    };

    const showButton = (check) => {
        setIsCheck(check[0].RNchecked);
    }

    return (
        <Container>
            { !modalVisible
                ?   <Content isIos={isIos}>
                        <ContentImg>
                            <Img source={logo} resizeMode='contain' />
                        </ContentImg>
                        <Form>
                            <Select setSelectFilial={setSelectFilial} setSelectErro={setSelectErro}  />
                            {selectErro && <Error>{"* Preencha esse campo"}</Error>}

                            <Input label={'Nome'} name={'nome'} control={control} />
                            {errors.nome && <Error>{errors.nome.message}</Error>}

                            <Input label={'E-mail'} name={'email'} control={control} />
                            {errors.email && <Error>{errors.email.message}</Error>}

                            <Input label={'Telefone'} name={'telefone'} control={control} mask={'phone'} />
                            {errors.telefone && <Error>{errors.telefone.message}</Error>}

                            <Input label={'CPF'} name={'cpf'} control={control} mask={'cpf'} />
                            {errors.cpf && <Error>{errors.cpf.message}</Error>}

                            <Input label={'Senha'} name={'senha'} control={control} />
                            {errors.senha && <Error>{errors.senha.message}</Error>}

                            <Input label={'Confirmar senha'} name={'confirmacao'} control={control} />
                            {errors.confirmacao && <Error>{errors.confirmacao.message}</Error>}
                        </Form>
                        <ContainerCheck>
                            <CheckboxFormX
                                dataSource={mockData}
                                itemShowKey='label'
                                itemCheckedKey='RNchecked'
                                iconSize={25}
                                iconColor='#79CB39'
                                onChecked={(item) => showButton(item)}
                            />
                            <ContentTermos onPress={() => {}}>
                                <Termos>Termos de Uso</Termos>
                            </ContentTermos>
                        </ContainerCheck>
                        <Footer>
                            <Button
                                label={'Cadastrar'}
                                reverse={true}
                                onPress={handleSubmit(onSubmit)}
                                disabled={!isCheck}
                                show={!isCheck}
                            />
                        </Footer>
                    </Content>
                :   <Modal visible={modalVisible} message={messageModal} label={'Login'} setModalVisible={setModalVisible} />
            }
        </Container>
    );
}

export default SignUp;
