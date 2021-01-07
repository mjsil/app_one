import styled from 'styled-components/native';

export const Content = styled.View`
    padding: 0 16px;
`;

export const Img = styled.Image`
    height: 120px;
    width: 100%;
    margin: ${props => (`${((props.windowHeight)/4)}px`)} 0;
`;
