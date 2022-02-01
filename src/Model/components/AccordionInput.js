import React from 'react';
import { useInput } from 'ra-core';

import AccordionDevastator from './AccordionDevastator'
import { FieldTitle } from 'ra-core';
// import { InputHelperText } from 'ra-ui-materialui';
import {
    FormControl,
    InputLabel,
} from '@material-ui/core';

const AccordionInput = (props) => {

    const {
        classes: classesOverride,
        configureQuill,
        helperText,
        label,
        source,
        fullWidth,
        refSource,
        resource,
        variant,
        fields,
        ...rest
    } = props;
    const {
        input: { value, onChange }
    } = useInput({ source, ...rest });

    // const valueType = useInput({ source: "type", ...rest });
    const changeData = (data) => {
        console.log('changeData', data)
        setComponent(data)
        onChange(JSON.stringify(data));
     }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    let dataComponent
    if (value) {
        console.log('value', value)
        try{
            dataComponent = JSON.parse(value)
        }catch{
            dataComponent = []
        }
    }
    else
        dataComponent = []

    const [component, setComponent] = React.useState(dataComponent)

    return (
        <FormControl
            // error={!!(touched && error)}
            fullWidth={fullWidth}
            className="ra-rich-text-input"
        >
            <InputLabel shrink >
                <FieldTitle
                    label={label}
                    source={source}
                    resource={resource}
                />
            </InputLabel>
            <AccordionDevastator fields={fields} data={component} changeData={changeData} />
        </FormControl>
    );
};

export default AccordionInput;
