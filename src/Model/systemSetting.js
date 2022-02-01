import * as React from "react";
import CustomTextInput from './components/CustomTextInput';
import {
    List,
    Datagrid,
    TextField,
    Edit,
    Create,
    SimpleForm,
    TextInput,
} from 'react-admin';
import CustomListActions from '../lib/CustomListActions'


export const SystemSettingList = props => (
    <List {...props} actions={<CustomListActions create={false}/>}>
        <Datagrid rowClick="edit">
            <TextField source="key" />
            <TextField source="title" />
        </Datagrid>
    </List>
);
export const SystemSettingEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="title" fullWidth />
            <TextInput source="key" fullWidth />
            <CustomTextInput source="desc" fullWidth />	
            <TextInput source="data" fullWidth multiline/>
        </SimpleForm>
    </Edit>
);
export const SystemSettingCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" fullWidth />
            <TextInput source="key" fullWidth />
            <CustomTextInput source="desc" fullWidth />	
            <TextInput source="data" fullWidth multiline/>
        </SimpleForm>
    </Create>
);
