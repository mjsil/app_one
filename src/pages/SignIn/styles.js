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

export const Password = styled.TouchableOpacity``;

export const PasswordLabel = styled.Text`
    text-align: right;
    color: #79CB39;
    font-size: 14px;
    text-decoration: underline;
    margin: 16px 0 0 0;
    text-decoration-color: #79CB39;
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

export const Contact = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 0 32px;
`;

export const Ball = styled.View`
    background: #C4C4C4;
    height: 13px;
    width: 13px;
    border-radius: 6.5px;
    margin: 1px 5px 0 0;
`;

export const ContactLabel = styled.Text`
    color: #41484A;
    font-size: 14px;
    text-decoration: underline;
`;
