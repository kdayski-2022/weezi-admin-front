// import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { UserList, UserEdit, UserCreate } from './Model/user';
import { SystemSettingList, SystemSettingEdit, SystemSettingCreate } from './Model/systemSetting';
import { ManagerList, ManagerEdit, ManagerCreate } from './Model/manager';
import { ManagerRoleList, ManagerRoleEdit, ManagerRoleCreate } from './Model/managerRole';
import { DaoList, DaoEdit, DaoCreate } from './Model/dao';
import { DaoUserList, DaoUserShow } from './Model/daoUser';
import Dashboard from './lib/Dashboard';
import authProvider from './lib/authProvider';
import dataProvider from './lib/dataProvider';
import CustomLayout from './lib/CustomLayout';
import customRoutes from './lib/customRoutes';
// import theme from './lib/theme';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';
const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const template = process.env.REACT_APP_TEMPLATE || 'academy'
let theme
async function importModule(path) {
  try {
    console.log(path)
    theme = await import(path);
  } catch (error) {
     console.error('import failed');
  }
}
switch (template) {
    case 'evorich':
      importModule('./lib/themeEvorich');
        break;
    default:
      importModule('./lib/themeAcademy');
        break;
}

const App = () => (
  <Admin title="Admin Panel" dashboard={Dashboard} layout={CustomLayout} dataProvider={dataProvider} i18nProvider={i18nProvider} authProvider={authProvider} customRoutes={customRoutes} theme={theme}>
  
  <Resource
      name="dao"
      edit={DaoEdit}
      list={DaoList}
      create={DaoCreate}
    />
    <Resource
      name="dao_user"
      show={DaoUserShow}
      list={DaoUserList}
    />
    <Resource
      name="user"
      edit={UserEdit}
      list={UserList}
      create={UserCreate}
    />
    <Resource
      name="system_setting"
      edit={SystemSettingEdit}
      list={SystemSettingList}
      create={SystemSettingCreate}
    />
    <Resource
      name="manager"
      edit={ManagerEdit}
      list={ManagerList}
      create={ManagerCreate}
    />
    <Resource
      name="manager_role"
      edit={ManagerRoleEdit}
      list={ManagerRoleList}
      create={ManagerRoleCreate}
    />
  </Admin>
);
export default App;
