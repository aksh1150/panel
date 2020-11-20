import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ListIcon from '@material-ui/icons/List';
import { BaseLink } from '../../atoms';
import TopNav from '../TopNav';

import './LeftNav.scss';
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    //  width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 5,
  },
  hide: {
    display: 'none',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100vh',
  },
}));

const LeftNav = ({ isLogin, children, isAdmin }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const setUser = isAdmin === 2;
  const menuItem = [
    {
      name: 'Manage Clients',
      icon: <PeopleAltTwoToneIcon />,
      link: setUser ? '/contacts' : '/contact',
    },
    {
      name: 'Add New Case',
      icon: <ListAltIcon />,
      link: setUser ? '/cases' : '/cases',
    },
    {
      name: 'Add New Lead',
      icon: <ListIcon />,
      link: setUser ? '/leads' : '/leads',
    },
  ];

  return (
    <React.Fragment>
      {isLogin ? (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          // className={`openIcon ${clsx(classes.menuButton, {
          //   [classes.hide]: open,
          // })}`}
          className={`${clsx(classes.menuButton, {
            [classes.hide]: open,
          })} openIcon ${open ? 'akshit' : 'show'}`}
        >
          <ChevronRightIcon />
        </IconButton>
      ) : (
        ''
      )}

      <div className={classes.root}>
        <CssBaseline />
        {isLogin ? (
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton
                onClick={handleDrawerClose}
                className={`menuicon ${open ? 'show' : ''}`}
              >
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              {menuItem.map(menu => (
                <ListItem key={menu.name}>
                  <BaseLink internal link={menu.link} className="iconLink">
                    {menu.icon} <span>{menu.name}</span>
                  </BaseLink>
                </ListItem>
              ))}
            </List>
          </Drawer>
        ) : (
          ''
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </React.Fragment>
  );
};

export default LeftNav;
