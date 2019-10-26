import { auth, firebase } from "../../lib/db";
import React              from 'react';
import Link               from 'next/link';

import { fade, makeStyles } from '@material-ui/core/styles';

import AppBar     from '@material-ui/core/AppBar';
import Toolbar    from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem   from '@material-ui/core/MenuItem';
import Menu       from '@material-ui/core/Menu';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MeetingRoom   from '@material-ui/icons/MeetingRoom';
import ExitToApp     from '@material-ui/icons/ExitToApp';
import MoreIcon      from '@material-ui/icons/MoreVert';
import AddToQueue    from '@material-ui/icons/AddToQueue';


const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
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
    }
}));

const handleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    auth
        .signInWithPopup(provider)
        .then(() => {
        alert("You are signed In");
        })
        .catch(err => {
        alert("OOps something went wrong check your console");
        console.log(err);
        });
};

const handleSignout = () => {
    auth
        .signOut()
        .then(function() {
        alert("Logout successful");
        })
        .catch(function(error) {
        alert("OOps something went wrong check your console");
        console.log(err);
        });
};

const goToMyPage = () => {
    document.location.href = "/my-page";
};

const goToMakeFanPage = () => {
    document.location.href = "/make-fan-page";
};


export default function Header() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };

    const handleMobileMenuOpen = event => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={handleSignIn}>
          <IconButton color="inherit">
              <MeetingRoom/>
          </IconButton>
          <p>Sign in</p>
        </MenuItem>
        <MenuItem onClick={handleSignout}>
          <IconButton color="inherit">
              <ExitToApp/>
          </IconButton>
          <p>Sign out</p>
        </MenuItem>
        <MenuItem onClick={goToMyPage}>
          <IconButton
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>My Page</p>
        </MenuItem>
        <MenuItem onClick={goToMakeFanPage}>
          <IconButton
            color="inherit"
          >
            <AddToQueue />
          </IconButton>
          <p>Create Your Page</p>
        </MenuItem>
      </Menu>
    );

    return (
        <div className={classes.grow}>
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title} variant="h6" noWrap>
                <Link href="/">
                  <a>Fan Club</a>
                </Link>
              </Typography>

              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton color="inherit" onClick={handleSignIn}>
                    <MeetingRoom />
                </IconButton>
                <IconButton color="inherit" onClick={handleSignout}>
                    <ExitToApp />
                </IconButton>
                <IconButton color="inherit" onClick={goToMyPage}>
                  <AccountCircle />
                </IconButton>
                <IconButton color="inherit" onClick={goToMakeFanPage}>
                  <AddToQueue />
                </IconButton>
              </div>


              <div className={classes.sectionMobile}>
                <IconButton
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>

            </Toolbar>
          </AppBar>
          {renderMobileMenu}
        </div>
      );
}