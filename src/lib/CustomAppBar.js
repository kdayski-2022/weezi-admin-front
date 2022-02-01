import * as React from 'react';
import { AppBar, UserMenu } from 'react-admin';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import LocaleSwitcher from './localeSwitcher'
// import { ReactComponent as Logo } from './logo-academy.svg';

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    logo: {
        height: 50,
    },
    spacer: {
        flex: 1,
    },
});
const MyUserMenu = props => (
    <UserMenu {...props}>
    </UserMenu>
);

const CustomAppBar = props => {
    const classes = useStyles();
    return (
        <AppBar {...props} userMenu={<MyUserMenu />}>
           
            {/* <Logo className={classes.logo} /> */}
            <span className={classes.spacer} />
        </AppBar>
    );
};

export default CustomAppBar;