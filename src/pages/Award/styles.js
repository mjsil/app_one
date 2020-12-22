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

export const Contracts = styled.ScrollView`
    padding: 0 16px;
`;

export const Contract = styled.View`
    padding: 16px;
    background: #fff;
    border-radius: 10px;
    margin: 0 0 16px;
`;

export const ContentName = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Name = styled.Text`
    color: #000;
    font-size: 16px;
    font-weight: 700;
`;

export const Content = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 16px 0;
`;

export const ContentValue = styled.View`
    align-items: center;
`;

export const Label = styled.Text`
    color: #41484A;
    font-size: 14px;
`;

export const Value = styled.Text`
    font-weight: 700;
    color: #000;
    font-size: 16px;
    margin: 3px 0 0;
`;

export const Card = styled.View`
    background: ${props => (props.pago ? "#79CB39" : "#FF9900")};
    padding: 5px 10px;
    border-radius: 10px;
`;

export const CardLabel = styled.Text`
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
`;
