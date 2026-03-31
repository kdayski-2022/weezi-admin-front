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
    // DAO
    dao: [
      {
        id: 1,
        name: 'Academy DAO',
        address: '0x1111111111111111111111111111111111111111',
        networkId: '1',
        proxyDaoId: 'academy-dao',
        description: 'Основное DAO академии',
        userAddress: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      },
      {
        id: 2,
        name: 'Evorich DAO',
        address: '0x2222222222222222222222222222222222222222',
        networkId: '56',
        proxyDaoId: 'evorich-dao',
        description: 'Партнёрское DAO',
        userAddress: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      },
      {
        id: 3,
        name: 'Test DAO',
        address: '0x3333333333333333333333333333333333333333',
        networkId: '137',
        proxyDaoId: 'test-dao',
        description: 'Тестовое DAO для разработки',
        userAddress: '0xcccccccccccccccccccccccccccccccccccccccc',
      },
    ],
    // Пользователи DAO
    dao_user: [
      {
        id: 1,
        dao_id: 1,
        name: 'Academy User 1',
        userAddress: '0xaaaa000000000000000000000000000000000001',
        gTokenName: 'Academy Governance',
        gTokenSymbol: 'AGOV',
        cTokenName: 'Academy Contribution',
        cTokenSymbol: 'ACON',
      },
      {
        id: 2,
        dao_id: 1,
        name: 'Academy User 2',
        userAddress: '0xaaaa000000000000000000000000000000000002',
        gTokenName: 'Academy Governance',
        gTokenSymbol: 'AGOV',
        cTokenName: 'Academy Contribution',
        cTokenSymbol: 'ACON',
      },
      {
        id: 3,
        dao_id: 2,
        name: 'Evorich User 1',
        userAddress: '0xbbbb000000000000000000000000000000000001',
        gTokenName: 'Evorich Governance',
        gTokenSymbol: 'EGOV',
        cTokenName: 'Evorich Contribution',
        cTokenSymbol: 'ECON',
      },
      {
        id: 4,
        dao_id: 3,
        name: 'Test User 1',
        userAddress: '0xcccc000000000000000000000000000000000001',
        gTokenName: 'Test Governance',
        gTokenSymbol: 'TGOV',
        cTokenName: 'Test Contribution',
        cTokenSymbol: 'TCON',
      },
    ],
    // Глобальные пользователи (userId используется в списке)
    user: [
      { id: 1, userId: 'global-1001' },
      { id: 2, userId: 'global-1002' },
      { id: 3, userId: 'global-1003' },
      { id: 4, userId: 'global-2001' },
    ],
    // Системные настройки
    system_setting: [
      {
        id: 1,
        key: 'site_name',
        title: 'Название проекта',
        desc: 'Отображается в заголовке и письмах',
        data: 'Weezi Admin (offline demo)',
      },
      {
        id: 2,
        key: 'support_email',
        title: 'Поддержка',
        desc: 'Адрес почты поддержки пользователей',
        data: 'support@example.com',
      },
      {
        id: 3,
        key: 'default_locale',
        title: 'Язык по умолчанию',
        desc: 'Локаль интерфейса',
        data: 'ru',
      },
    ],
    // Роли менеджеров
    manager_role: [
      { id: 1, name: 'Администратор', key: 'admin' },
      { id: 2, name: 'Модератор', key: 'moderator' },
      { id: 3, name: 'Контент-менеджер', key: 'content' },
    ],
    // Менеджеры (login, name, role, active, teacherId)
    manager: [
      {
        id: 1,
        login: 'admin',
        name: 'Главный админ',
        password: 'admin',
        role: ['admin'],
        active: true,
        teacherId: null,
      },
      {
        id: 2,
        login: 'moderator',
        name: 'Модератор контента',
        password: 'moderator',
        role: ['moderator', 'content'],
        active: true,
        teacherId: null,
      },
      {
        id: 3,
        login: 'viewer',
        name: 'Просмотр только',
        password: 'viewer',
        role: [],
        active: false,
        teacherId: null,
      },
    ],
    // teacher используется как reference в менеджерах
    teacher: [
      { id: 1, title: 'Иван Иванов' },
      { id: 2, title: 'Мария Петрова' },
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
