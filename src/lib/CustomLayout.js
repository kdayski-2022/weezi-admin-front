import * as React from 'react';
import { Layout } from 'react-admin';
import CustomAppBar from './CustomAppBar';
import { AdminMenu } from './Menu';

const CustomLayout = (props) => {
	return (<Layout {...props} menu={AdminMenu} appBar={CustomAppBar} />)
}

export default CustomLayout;