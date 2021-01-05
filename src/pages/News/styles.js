import styled from 'styled-components/native';

export const Content = styled.View`
    flex: 1;
    background: #eee;
    padding-bottom: ${(props) => (props.isIos ? '16px' : '0')};
`;

export const Header = styled.View`
    flex-direction: row;
    background: #79cb39;
    align-items: center;
    padding: 16px;
`;

export const Icon = styled.TouchableOpacity`
    background: #0d8613;
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

export const Contract = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #fff;
    border-radius: 10px;
    margin: 16px;
`;

export const Message = styled.Text`
    color: #41484a;
    font-size: 18px;
    font-weight: 700;
`;
