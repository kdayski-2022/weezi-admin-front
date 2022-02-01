import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    ReferenceInput,
    SelectInput,
    ReferenceArrayInput,
    AutocompleteArrayInput,
} from 'react-admin';
import CustomListActions from '../lib/CustomListActions'


const labels = {
    role: "Роль пользователя",
    login: "Логин",
    name: "Имя пользователя",
    password: "Пароль пользователя",
    active: "Активен",
    teacher: "Преподаватель",
}
export const ManagerList = props => (
    <List {...props} actions={<CustomListActions />}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="login" label={labels.login} />
            <TextField source="name" label={labels.name} />
        </Datagrid>
    </List>
);
const simpleForm = 
<SimpleForm>
    <TextInput source="login" fullWidth label={labels.login} />
    <TextInput source="name" fullWidth label={labels.name} />
    <TextInput source="password" fullWidth label={labels.password} />
    <ReferenceArrayInput label={labels.role} reference="manager_role" source="role">
        <AutocompleteArrayInput optionText="name" optionValue="key"/>
    </ReferenceArrayInput>
    <BooleanInput source="active" label={labels.active} />
    <ReferenceInput label={labels.teacher} source="teacherId" reference="teacher" allowEmpty>
        <SelectInput optionText="title" optionValue="id"/>
    </ReferenceInput>
</SimpleForm>
export const ManagerEdit = props => (
    <Edit {...props}>
        {simpleForm}
    </Edit>
);
export const ManagerCreate = props => (
    <Create {...props}>
        {simpleForm}        
    </Create>
);
