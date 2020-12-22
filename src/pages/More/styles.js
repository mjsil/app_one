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
    padding: ${props => (props.viewZoom ? '0' : '0 16px')};
`;

export const Contract = styled.View`
    padding: ${props => (props.viewZoom ? '0' : '0 16px 16px')};
    background: #fff;
    border-radius: ${props => (props.viewZoom ? '0' : '10px')};
    margin-top: ${props => (props.viewZoom ? '-16px' : '0')};
    justify-content: space-around;
`;

export const Description = styled.Text`
    color: #41484A;
    font-size: 16px;
    font-weight: 700;
    text-align: justify;
    margin: 20px 0;
`;

export const Date = styled.Text`
    color: #41484A;
    font-size: 14px;
    margin: 5px 0 0;
`;

export const Img = styled.Image`
    height: 250px;
    width: 100%;
    margin-top: 20px;
`;

export const Info = styled.View`
    flex-direction: row;
    justify-content: space-around;
`;

export const ContentInfo = styled.View`
    justify-content: center;
    align-items: center;
`;

export const Label = styled.Text`
    font-size: 16px;
    color: #41484A;
    margin: 5px 0 0;
    text-align: justify;
`;

export const Value = styled.Text`
    font-size: 18px;
    font-weight: 700;
    color: #41484A;
`;

export const Espace = styled.View`
    margin: 5px 0;
`;

export const State = styled.View`
    flex: 1;
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
    margin: 15px 0 0;
`;

export const LabelState = styled.Text`
    font-size: 14px;
    color: #fff;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
`;
