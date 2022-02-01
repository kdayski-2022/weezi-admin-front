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
    description: "Описание",
    proxyDaoId: "Адрес в proxy",
    tvl: "TOTAL VALUE LOCKED",
    apy: "APY",
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
    <TextInput source="proxyDaoId" fullWidth label={labels.proxyDaoId} />
    <TextInput source="description" fullWidth label={labels.description} />
    {/* <TextInput source="tvl" fullWidth label={labels.tvl} />
    <TextInput source="apy" fullWidth label={labels.apy} />
    <TextInput source="withdrawalAddress" fullWidth />
    <TextInput source="depositAddress" fullWidth /> */}
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
