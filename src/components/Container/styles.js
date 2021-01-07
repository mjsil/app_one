import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const FullContainer = styled(SafeAreaView)`
    flex: 1;
    background: #79CB39;
    margin-bottom: ${props => (props.isIos ? "-32px" : "0")};
`;
