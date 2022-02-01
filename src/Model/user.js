import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    Edit,
    Create,
    SimpleForm,
    TextInput
} from 'react-admin';
import CustomListActions from '../lib/CustomListActions'

export const UserList = props => (
    <List {...props} actions={<CustomListActions />}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField label="Global User Id" source="userId" />
        </Datagrid>
    </List>
);
export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="userId" label="Global User Id" />
        </SimpleForm>
    </Edit>
);
export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="userId" label="Global User Id" />
        </SimpleForm>
    </Create>
);
