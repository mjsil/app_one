import React from 'react';
import { Controller } from "react-hook-form";

import { phoneMask, cpfMask } from "../Masks";

import { Ipt } from './styles'

const Input = ({ label, ...props }) => {
    const apllyMasks = (value) => {
        switch (props.mask) {
            case "cpf":
                return cpfMask(value);
            case "phone":
                return phoneMask(value);
            default:
                return value;
        }
    }

    return (
        <Controller
            control={props.control}
            render={({ onChange, onBlur, value }) => (
                <Ipt
                    value={apllyMasks(value)}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    placeholder={label}
                    placeholderTextColor={"#868686"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    {...props}
                />
            )}
            defaultValue=""
            name={props.name}
            rules={{ required: true }}
        />
    );
}

export default Input;
