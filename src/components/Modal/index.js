import React from 'react';
import Modal from 'react-native-modal';

import { Content, Label, Btn, BtnLabel } from './styles';

const FullModal = ({ visible, message, setModalVisible, label }) => (
    <Modal
        isVisible={visible}
    >
        <Content>
            <Label>{message}</Label>
            <Btn onPress={() => setModalVisible(false)}>
                <BtnLabel>{label}</BtnLabel>
            </Btn>
        </Content>
    </Modal>
);

export default FullModal;
