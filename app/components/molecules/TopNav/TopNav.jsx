import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';
import Buttons from '../Button/index';
import './TopNav.scss';
import { BaseLink } from '../../atoms';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const TopNav = ({
  isLogin,
  userName,
  userImg,
  classess,
  children,
  ...props
}) => {
  const classes = useStyles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const logout = () => {
    localStorage.removeItem('caribou-advisor');
    props.history.push('/');
  };
  const mobileMenuId = '';
  const profileButton = (
    <>
      <Box display={{ sm: 'block', md: 'none' }}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
          className="mobileProIcon"
        >
          <img src={userImg} className="profilepic" alt="user" />
        </IconButton>
      </Box>
      <Box display={{ xs: 'none', sm: 'none', md: 'block' }}>
        <Buttons
          link="/"
          internal
          colour="#1946b4"
          bg="#ffffff"
          roundBoarder
          className="profilebtn"
        >
          <img src={userImg} className="profilepic" alt="user" />
          <span className="username">{userName}</span>
        </Buttons>
      </Box>
    </>
  );

  const Logo = (
    <img
      src="https://static-getcaribou.s3.ca-central-1.amazonaws.com/images/Admin+Panel/logo.png"
      alt="logo"
      className="imglogo"
    />
  );

  const MobileLogo = (
    <img
      src="https://static-getcaribou.s3.ca-central-1.amazonaws.com/images/Admin+Panel/mobilelogo.png"
      alt="logo"
      className="imglogo"
    />
  );

  const logoutLogin = (
    <BaseLink link="/" internal className="loginlogout">
      <strong>Log in</strong>
    </BaseLink>
  );
  const LogoutLink = (
    <BaseLink clickEvent={logout} className="loginlogout">
      <strong>logout</strong>
    </BaseLink>
  );
  const profile = (
    <List>
      <ListItem>
        <ListItemText>
          <b>{userName}</b>
        </ListItemText>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText>
          <BaseLink link="/" internal className="loginlogout">
            Profile
          </BaseLink>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>{isLogin ? LogoutLink : ''}</ListItemText>
      </ListItem>
    </List>
  );


  const loginComponents = isLogin ? (
    <>
      {profileButton}
      {LogoutLink}
    </>
  ) : (
    ''
  );

  const renderMobileMenu = (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      anchorEl={mobileMoreAnchorEl}
      keepMounted
      id={mobileMenuId}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isLogin ? profile : ''}
    </Menu>
  );

  const menuItems = (
    <>
      <AppBar position="fixed" className={classess}>
        <Toolbar>
          {children}
          <BaseLink link="https://getcaribou.com/" external target="_blank" className="logo">
            <Box display={{ sm: 'block', md: 'none' }}>{MobileLogo}</Box>
            <Box display={{ xs: 'none', sm: 'none', md: 'block' }}>{Logo}</Box>
          </BaseLink>

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>{loginComponents}</div>
          <div className={classes.sectionMobile}>
            {isLogin ? profileButton : ''}
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );

  return menuItems;
};
export default withRouter(TopNav);
