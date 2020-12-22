import React from 'react';
import Select2 from "react-native-select-two";

const allFilias = [
    { id: 1, name: "Brasília" },
    { id: 2, name: "Minas Gerais" },
    { id: 3, name: "São Paulo" },
    { id: 4, name: "Rio de Janeiro" }
]

const Select = ({ setSelectFilial, setSelectErro }) => {
    return (
        <Select2
            isSelectSingle
            style={{
                borderRadius: 10,
                paddingVertical: 18,
                paddingHorizontal: 16,
                borderWidth: 1,
                borderColor: "#79CB39",
                marginTop: 16,
                color: "#41484A",
            }}
            placeholderTextColor={"#41484A"}
            cancelButtonText="Cancelar"
            selectButtonText="Ok"
            searchPlaceHolderText="Pesquisar..."
            listEmptyTitle="Não encontrei nada..."
            colorTheme="#79CB39"
            popupTitle="SELECIONE UMA FILIAL"
            title="Filial"
            data={allFilias}
            onSelect={data => {
                if(data[0]) {
                    setSelectErro(false);
                    setSelectFilial(allFilias[data[0]-1].name);
                } else {
                    setSelectErro(true);
                    setSelectFilial('');
                }
            }}
        />
    );
}

export default Select;
