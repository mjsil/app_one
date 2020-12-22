import styled from 'styled-components/native';

export const Content = styled.ScrollView`
    flex: 1;
    background: #eee;
`;

export const ContentHeader = styled.View`
    background: #79CB39;
    height: ${props => (`${((props.windowHeight)/4)}px`)};
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    margin-bottom: ${props => (props.windowHeight < 650 ? '32px' : '0')};
`;

export const Header = styled.View`
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding: 16px 16px 2px;
`;

export const Icon = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Ball = styled.View`
    background: #FF9900;
    height: 13px;
    width: 13px;
    border-radius: 6.5px;
    margin: 1px -10px 0 0;
    z-index: 2;
`;

export const HeaderLabel = styled.Text`
    font-size: 30px;
    font-weight: 700;
    color: #fff;
    text-transform: capitalize;
`;

export const Banner = styled.View`
    flex-direction: row;
    justify-content: space-between;
    background: #fff;
    margin: -100px 16px 0;
    border-radius: 10px;
`;

export const BannerLabel = styled.View`
    padding: 0 16px;
`;

export const Graphic = styled.View`
    flex-direction: row;
    padding: 16px;
`;

export const GraphicCurrency = styled.View`
    height: ${props => (props.graphicHeight > 0 ? `${props.graphicHeight}px` : '5px')};
    width: 36px;
    background: #79CB39;
    border-radius: 10px;
    border-width: 1px;
    border-color: #79CB39;
    margin-right: 12px;
    margin-top: auto;
`;

export const GraphicGoal = styled.View`
    max-height: ${props => (`${props.graphicHeight}px`)};
    width: 36px;
    background: #41484A;
    border-radius: 10px;
    border-width: 1px;
    border-color: #41484A;
`;

export const MoreInfo = styled.View`
    margin: 16px 0;
`;

export const Label = styled.Text`
    color: ${props => (props.currency ? "#fff" : "#41484A")};
    font-weight: 700;
    font-size: ${props => (props.currency ? "18px" : "18px")};
`;

export const ContentValue = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
`;

export const Currency = styled.View`
    padding: 5px 10px;
    background: ${props => (props.meta ? "#41484A" : "#79CB39")};;
    margin-right: 10px;
    border-radius: 10px;
`;

export const Value = styled.Text`
    color: #41484A;
    font-weight: 700;
    font-size: 27px;
`;

export const Cards = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 16px 0;
`;
export const Card = styled.View`
    padding: 16px;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 10px;
    min-width: 159px;
`;

export const CardTitle = styled.Text`
    font-size: 14px;
    color: #41484A;
    margin: 0 0 5px;
    font-weight: 700;
`;

export const Infos = styled.View``;

export const Title = styled.Text`
    font-size: 20px;
    color: #41484A;
    font-weight: 700;
`;

export const ContractTitle = styled.Text`
    font-size: 14px;
    color: #79CB39;
    margin: 1px 0 0 5px;
    font-weight: 700;
`;

export const Info = styled.TouchableOpacity`
    flex-direction: ${props => (props.prospection ? 'column' : 'row')};
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #fff;
    border-radius: 10px;
    margin: 8px 16px;
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
        props.cod === 2
        ? "#79CB39"
        : props.cod === 3
        ? "#e61919"
        : "#e5e619"
    )};
    border-radius: 10px;
    padding: 5px 10px;
    align-items: center;
    justify-content: center;
    margin:  ${props => (props.prospection ? '16px 0 0' : '0')};
`;

export const LabelState = styled.Text`
    font-size: 14px;
    color: #fff;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
`;

