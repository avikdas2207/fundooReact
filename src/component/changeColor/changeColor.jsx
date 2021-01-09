import React from 'react';
import './changeColor.scss';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
const services = require('../../service/note_service.js');

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const MenuListComposition = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const whiteCall = () => {
      console.log("white calling");
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);


  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
           onClick={handleToggle}
        >
        <ColorLensOutlinedIcon />
        </Button>

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper className="colorContainer">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose} >
                        <div className="colorPlate" onClick={whiteCall} id="white"></div>
                        <div className="colorPlate" id="red"></div>
                        <div className="colorPlate" id="orange"></div>
                        <div className="colorPlate" id="yellow"></div>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                    <div className="colorPlate" id="green"></div>
                    <div className="colorPlate" id="teal"></div>
                    <div className="colorPlate" id="blue"></div>
                    <div className="colorPlate" id="darkBlue"></div>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                    <div className="colorPlate" id="purple"></div>
                    <div className="colorPlate" id="pink"></div>
                    <div className="colorPlate" id="brown"></div>
                    <div className="colorPlate" id="grey"></div>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
export default MenuListComposition;