import React from 'react';

import { Btn, Label } from './styles';

const Button = ({ label, show = false, ...props}) => {
    return (
        <Btn name={label} show={show} {...props} >
            <Label name={label} show={show} {...props}>{label}</Label>
        </Btn>
    );
}

export default Button;
