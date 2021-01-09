import React, { useState, useEffect } from 'react';
import DisplayNote from '../displayNote/displayNote.jsx';
import DisplayTrashNote from '../trashNote/trashNote.jsx';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import './appbar.scss';
import SimpleAccordion from '../card-new/card.jsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import keepLogo from '../../assets/keepLogo.png';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
const services = require('../../service/note_service.js');

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
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
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
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
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const MiniDrawer = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [notes, setNotes] = useState([]);
  const [trashNotes, setTrashNotes] = useState([]);

  useEffect(() => {
      getAllNotes();
  }, [])

  const getAllNotes = () => {
    console.log("card calling");
    services.getAllNotes().then((res) => {
        console.log(res);
        console.log(res.data.data.data);
        const noteValue = res.data.data.data;
        setNotes(res.data.data.data);
    })
        .catch((err) => {
            console.log(err);
        })
}


const trashNotesList = () => {
  console.log("trash Calling");
  services.trashNotes().then((res) => {
      console.log(res);
      console.log(res.data.data.data);
      const noteValue = res.data.data.data;
      setTrashNotes(res.data.data.data);
  })
      .catch((err) => {
          console.log(err);
      })
}


const logOut = () => {
  const token = localStorage.getItem("token");
  localStorage.clear();
  console.log(token);
  props.history.push('/login')
}

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root} id="appBar">
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar)}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <img src={keepLogo} alt="keep" height="50px" />
          <Typography variant="h6" noWrap>
            Keep
          </Typography>
          <div className="searchBar">
            <SearchIcon id="searchIcon" />
            <input placeholder="Search…" id="searchInput" />
          </div>
          <div id="navIcon">
          <AccountCircleIcon onClick={logOut} />
          </div>
        </Toolbar>
      </AppBar>
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          
          <ListItem >
              <ListItemIcon> <EmojiObjectsIcon /> </ListItemIcon>
              <ListItemText primary="Notes" />
          </ListItem>
          
          <ListItem >
              <ListItemIcon> <NotificationsNoneOutlinedIcon /> </ListItemIcon>
              <ListItemText primary="Reminders" />
          </ListItem>

          <ListItem >
              <ListItemIcon> <CreateOutlinedIcon /> </ListItemIcon>
              <ListItemText primary="Edit Labels" />
          </ListItem>

          <ListItem >
              <ListItemIcon> <ArchiveOutlinedIcon /> </ListItemIcon>
              <ListItemText primary="Archives" />
          </ListItem>

          <ListItem onClick={trashNotesList}>
              <ListItemIcon> <DeleteForeverOutlinedIcon  /> </ListItemIcon>
              <ListItemText primary="Trash" />
          </ListItem>
            
        </List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <SimpleAccordion getAllNotes={getAllNotes} />
        <DisplayNote notes={notes}  getAllNotes={getAllNotes} />
        <DisplayTrashNote trash={trashNotes} trashNote={trashNotesList} />
      </main>
    </div>
  );
}
export default withRouter(MiniDrawer);