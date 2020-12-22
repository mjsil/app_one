import styled from 'styled-components/native';

export const Btn = styled.TouchableOpacity`
    background: ${props => (props.show ? "#fff" : props.reverse ? "#79CB39" : props.name === "Entrar" ? "#fff" : "#79CB39")};
    padding: 16px;
    border-radius: 10px;
    border-width: 1px;
    border-color: ${props => (props.reverse ? "#eee" : "#fff")};
    margin: 8px 0;
`;

export const Label = styled.Text`
    text-align: center;
    font-weight: 700;
    font-size: 20px;
    color: ${props => (props.show ? "#d3d3d3" : props.reverse ? "#fff" : props.name === "Entrar" ? "#79CB39" : "#fff")};
`;
