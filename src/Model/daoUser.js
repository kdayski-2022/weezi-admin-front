import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    Show,
    SimpleShowLayout,
} from 'react-admin';
import CustomListActions from '../lib/CustomListActions'


const labels = {
    name: "Название",
    userAddress: "Адрес пользователя",
}
export const DaoUserList = props => (
    <List {...props} actions={<CustomListActions />}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" label={labels.name} />
            <TextField source="userAddress" label={labels.name} />
        </Datagrid>
    </List>
);
const simpleForm = 
<SimpleShowLayout>
    <TextField source="name" fullWidth label={labels.name} />
    <TextField source="userAddress" fullWidth label={labels.userAddress} />
    <TextField source="gTokenName" fullWidth  />
    <TextField source="gTokenSymbol" fullWidth  />
    <TextField source="cTokenName" fullWidth  />
    <TextField source="cTokenSymbol" fullWidth  />
</SimpleShowLayout>
export const DaoUserShow = props => (
    <Show {...props}>
        {simpleForm}
    </Show>
);
