import React from 'react';
import { Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

import {
    Img
} from './styles';

const Zoom = ({ Uri }) => {
    return (
        <ImageZoom
            cropWidth = { Dimensions.get('window').width }
            cropHeight = { Dimensions.get('window').height }
            imageWidth = { Dimensions.get('window').width }
            imageHeight = { Dimensions.get('window').height }
        >
            <Img
                resizeMode="contain"
                source={{
                    uri: `${Uri}`,
                }}
            />
        </ImageZoom>
    );
}

export default Zoom;
