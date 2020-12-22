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

export const ContentHeader = styled.View`
    padding: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #41484A;
`;

export const IconContent = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const ContractTitle = styled.Text`
    font-size: 14px;
    color: #79CB39;
    margin: 1px 0 0 5px;
    font-weight: 700;
`;

export const AllContracts = styled.ScrollView`
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

export const Description = styled.View``;

export const Date = styled.Text`
    color: #41484A;
    font-size: 14px;
    margin: 5px 0 0;
`;

export const State = styled.View`
    background: ${props => (
        ((props.cod === 1001) || (props.cod === 4001))
        ? "#79CB39"
        : ((props.cod === 2001) || (props.cod === 3001))
        ? "#e61919"
        : ((props.cod === 5001) || (props.cod === 8001))
        ? "#e5e619"
        : ((props.cod === 6001) || (props.cod === 7001))
        ? "#000"
        : "#eee"
    )};
    border-radius: 10px;
    padding: 5px 10px;
    align-items: center;
    justify-content: center;
`;

export const LabelState = styled.Text`
    font-size: 14px;
    color: #fff;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
`;
