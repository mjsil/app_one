import styled from 'styled-components/native';

export const Content = styled.View`
    flex: 1;
    background: #fff;
    padding-bottom: ${props => (props.isIos ? "16px" : "0")};
`;

export const ContentImg = styled.View`
    background: #79CB39;
`;

export const Img = styled.Image`
    height: 120px;
    width: 100%;
`;

export const Form = styled.ScrollView`
    flex: 1;
    padding: 0 16px;
`;

export const Error = styled.Text`
    padding: 3px 3px 0;
    color: #e61919;
    font-size: 14px;
`;

export const Footer = styled.View`
    padding: 0 16px;
    background: #eee;
`;

export const ContainerCheck = styled.View`
    align-items: center;
    justify-content: center;
    margin: 16px 0;
`;

export const ContentTermos = styled.TouchableOpacity``;

export const Termos = styled.Text`
    margin-top: 5px;
    font-size: 14px;
    color: #79CB39;
    text-decoration: underline;
    text-decoration-color: #79CB39;
`;
