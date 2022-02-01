import React from 'react';
import { useRecordContext  } from 'ra-core';

import {
    // ReferenceArrayInput,
    // AutocompleteArrayInput,
    SingleFieldList,
    ChipField,
    ReferenceArrayField
} from 'react-admin';

const CatalogTypeField = (props) => {

    

    const record = useRecordContext (props);
    return (
        <div> 
            {record['type'] === 1 && <ReferenceArrayField label="Title" reference="program" source="program">
                <SingleFieldList>
                    <ChipField source="title" />
                </SingleFieldList>
            </ReferenceArrayField> }
            {record['type'] === 2 && <ReferenceArrayField label="Title" reference="course" source="course">
                <SingleFieldList>
                    <ChipField source="title" />
                </SingleFieldList>
            </ReferenceArrayField> }
    </div>
    );
};

export default CatalogTypeField;
