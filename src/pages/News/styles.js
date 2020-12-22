import styled from 'styled-components/native';

export const Content = styled.View`
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

export const Icon = styled.TouchableOpacity`
    background: #0D8613;
    align-items: center;
    justify-content: center;
    height: 39px;
    width: 39px;
    border-radius: 19.5px;
    margin: 1px 16px 0 0;
`;

export const HeaderLabel = styled.Text`
    font-size: 30px;
    font-weight: 700;
    color: #fff;
`;

export const Contracts = styled.ScrollView`
    padding: 0 16px;
`;

export const Contract = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #fff;
    border-radius: 10px;
    margin: 0 0 16px;
`;

export const Name = styled.Text`
    color: #41484A;
    font-size: 14px;
    font-weight: 700;
`;

export const Date = styled.Text`
    color: #41484A;
    font-size: 14px;
    margin: 5px 0 0;
`;
