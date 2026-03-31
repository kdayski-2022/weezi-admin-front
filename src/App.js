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

// Простой мок authProvider, чтобы можно было зайти без бекенда
const authProvider = {
  login: () => Promise.resolve(),
  checkError: () => Promise.resolve(),
  checkAuth: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  getIdentity: () => Promise.resolve({ id: 1, fullName: 'Demo Admin' }),
  getPermissions: () => Promise.resolve('admin'),
};

// Мок dataProvider на базе ra-data-fakerest (инлайново, чтобы не зависеть от API)
const { default: fakeDataProvider } = require('ra-data-fakerest');
const dataProvider = fakeDataProvider(
  {
    dao: [{ id: 1, name: 'Demo DAO', description: 'Пример DAO без бекенда' }],
    dao_user: [
      { id: 1, dao_id: 1, name: 'Demo DAO User', email: 'user@example.com' },
    ],
    user: [{ id: 1, name: 'Demo User', email: 'demo@weezi.local' }],
    system_setting: [
      { id: 1, key: 'site_name', value: 'Weezi Demo (offline)' },
    ],
    manager: [{ id: 1, name: 'Admin Manager', role: 'admin' }],
    manager_role: [
      { id: 1, name: 'admin', description: 'Полный доступ (offline)' },
    ],
  },
  true
);

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
