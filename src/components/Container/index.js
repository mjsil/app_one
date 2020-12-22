import React from 'react';
import { Platform } from 'react-native';

import { FullContainer } from './styles';

const Container = ({ children }) => {
    const isIos = Platform.OS === 'ios' ? true : false;

    return (
        <FullContainer isIos={isIos}>
            { children }
        </FullContainer>
    )
}

export default Container;
