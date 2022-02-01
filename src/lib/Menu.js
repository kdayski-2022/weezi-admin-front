import * as React from 'react';
import { Link } from 'react-router-dom';
// import { DashboardMenuItem } from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
import PeopleIcon from '@material-ui/icons/People';
import StorageIcon from '@material-ui/icons/Storage';
// import LaptopChromebookOutlinedIcon from '@material-ui/icons/LaptopChromebookOutlined';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './css/sidebar.css';
import Cookies from 'universal-cookie'
const cookies = new Cookies();

export const AdminMenu = () => {
  let role = cookies.get('role')
  role = Array.isArray(role)? role:[]
  const checkRole = (roles)=>{
    console.log(role)
    if(roles === undefined) roles = ['admin']
    let has = false
    for (const r of roles) {
      if (~role.indexOf(r)) {
          has = true
          break
      }
    }
    return has
  }
  
  const res = <div>
    {/* <DashboardMenuItem /> */}
    {/* <MenuItemLink to="/events" primaryText="Posts" leftIcon={<BookIcon />}/>
        <MenuItemLink to="/comments" primaryText="Comments" leftIcon={<ChatBubbleIcon />}/>
        <MenuItemLink to="/users" primaryText="Users" leftIcon={<PeopleIcon />}/>
        <MenuItemLink to="/custom-route" primaryText="Miscellaneous" leftIcon={<LabelIcon />}/> */}
    <ProSidebar style={{paddingTop: "20px"}}>
      <Menu iconShape="square">
        {/* <MenuItem to>Материалы</MenuItem> */}
        {checkRole() ? 
        <SubMenu title="ДАО" icon={<BookIcon />} >
          <MenuItem>Список ДАО<Link to="/dao" /></MenuItem>
          <MenuItem>Созданные ДАО<Link to="/dao_user" /></MenuItem>
        </SubMenu>:''}
        
        {checkRole() ? 
        <SubMenu title="Пользователи" icon={<PeopleIcon />} >
          <MenuItem>Пользователи<Link to="/user" /></MenuItem>
          <MenuItem>Администраторы<Link to="/manager" /></MenuItem>
        </SubMenu>:''}
        {checkRole() ? 
        <SubMenu title="Настройка" icon={<StorageIcon />} >
          <MenuItem>API KEY<Link to="/api_key" /></MenuItem>
          <MenuItem>Роли<Link to="/manager_role" /></MenuItem>
          <MenuItem>Системные настройки<Link to="/system_setting" /></MenuItem>
          </SubMenu>:''}
      </Menu>
    </ProSidebar>
  </div>
  return res
};
