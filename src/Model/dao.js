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
    name: "Название",
    address: "Адрес",
    networkId: "Network ID",
    description: "Описание",
    userAddress: "User Address",
    proxyDaoId: "Адрес в proxy"
}
export const DaoList = props => (
    <List {...props} actions={<CustomListActions />}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="proxyDaoId" />
            <TextField source="name" label={labels.name} />
        </Datagrid>
    </List>
);
const simpleForm = 
<SimpleForm>
    <TextInput source="name" fullWidth label={labels.name} />
    <TextInput source="address" fullWidth label={labels.address} />
    <TextInput source="networkId" fullWidth label={labels.networkId} />
    <TextInput source="proxyDaoId" fullWidth label={labels.proxyDaoId} />
    <TextInput source="description" fullWidth label={labels.description} />
    <TextInput source="userAddress" fullWidth label={labels.userAddress} />
    
</SimpleForm>
export const DaoEdit = props => (
    <Edit {...props}>
        {simpleForm}
    </Edit>
);
export const DaoCreate = props => (
    <Create {...props}>
        {simpleForm}        
    </Create>
);
