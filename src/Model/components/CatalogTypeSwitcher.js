import React from 'react';
import { useInput } from 'ra-core';

import {
    ReferenceArrayInput,
    AutocompleteArrayInput
} from 'react-admin';

const CatalogTypeSwitcher = (props) => {

    const {
        classes: classesOverride,
        configureQuill,
        helperText,
        label,
        source,
        refSource,
        resource,
        variant,
        ...rest
    } = props;

    const valueType = useInput({ source: "type", ...rest });
    return (
        <div> 
            {valueType.input.value === 1 && <ReferenceArrayInput label="Программа" reference="program" source="program" sort={{ field: 'title', order: 'ASC' }} perPage={1000} fullWidth>
        <AutocompleteArrayInput optionText="title" optionValue="id"/>
    </ReferenceArrayInput> }
            {valueType.input.value === 2 && <ReferenceArrayInput label="Курсы" reference="course" source="course" sort={{ field: 'title', order: 'ASC' }} perPage={1000} fullWidth>
        <AutocompleteArrayInput optionText="title" optionValue="id"/>
    </ReferenceArrayInput> }
    </div>
    );
};

export default CatalogTypeSwitcher;
