import styled from 'styled-components/native';

export const ContentFull = styled.View`
    flex: 1;
    background: #eee;
    padding-bottom: ${props => (props.isIos ? "16px" : "0")};
`;

export const Header = styled.View`
    flex-direction: row;
    background: #79CB39;
    align-items: center;
    padding: 16px;
`;

export const HeaderLabel = styled.Text`
    font-size: 30px;
    font-weight: 700;
    color: #fff;
    text-transform: capitalize;
`;

export const Content = styled.View`
    flex: 1;
`;

export const Option = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    border-color: #41484A;
    padding: 16px;
    justify-content: ${props => (props.versao ? 'center' : 'flex-start')};
    background: ${props => (props.versao ? '#eee' : '#fff')};;
    margin: 8px 0 0;
`;

export const Label = styled.Text`
    margin: ${props => (props.versao ? '0' : '0 0 0 15px')};
    color: #41484A;
    font-weight: ${props => (props.versao ? '500' : '700')};
    font-size: 18px;
`;
