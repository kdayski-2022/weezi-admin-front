import * as React from "react";
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

const labels = {
    name: "Имя роли",
    key: "Ключ роли",
}
export const ManagerRoleList = props => (
    <List {...props} actions={<CustomListActions />}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" label={labels.name} />
        </Datagrid>
    </List>
);
export const ManagerRoleEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" fullWidth label={labels.name} />
            <TextInput source="key" fullWidth label={labels.key} />
        </SimpleForm>
    </Edit>
);
export const ManagerRoleCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" fullWidth label={labels.name} />
            <TextInput source="key" fullWidth label={labels.key} />
        </SimpleForm>
    </Create>
);
