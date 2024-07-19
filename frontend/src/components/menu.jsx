import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import iconImage from '../images/drivejiejie-logo-blue.png';
import tipImage from '../images/tips-logo.png';
import { Navigate } from 'react-router-dom';
import{ Clear } from '../pages/clear.js'

export default function HamburgerMenu({ email, userName }) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };


    const DrawerList = (
        <Box
            sx={{ width: 280 }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <Box
                sx={{
                    backgroundColor: 'yellow',
                    // padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box display="flex" alignItems="center" mb={2}>
                    <img
                        src={iconImage}
                        alt="icon"
                        style={{
                            width: 61.1,
                            height: 43.2,
                            borderRadius: '50%',
                            marginRight: '16px',
                            marginTop: '20px',
                        }}
                    />
                    <Typography
                        variant="h6"
                        mb={1}
                        sx={{
                            textAlign: 'center',
                            marginRight: '65px',
                            marginTop: '20px',
                        }}
                    >
                        <span style={{ color: 'blue' }}>drive</span>
                        <span style={{ color: 'black' }}>JieJie</span>
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Box
                    sx={{
                        backgroundColor: 'white',
                        padding: '16px',
                        borderRadius: '8px',
                    }}
                    display="flex"
                    alignItems="center"
                    mb={1}
                >
                    <Avatar sx={{ bgcolor: 'grey' }}>A</Avatar>
                    <Box ml={2}>
                        <Typography variant="body1">Hi, {userName}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {email.length > 23
                                ? email.slice(0, 23) + '...'
                                : email}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Divider
                sx={{
                    backgroundColor: 'yellow',
                    height: '2px',
                    width: '85%',
                    ml: 'auto',
                }}
            />
            <Box sx={{ backgroundColor: 'white', padding: '16px' }}>
                <List>
                    {['Tips'].map((text) => (
                        <ListItemButton key={text} disablePadding>
                            <ListItemIcon>
                                <img
                                    src={tipImage}
                                    alt="Tips Logo"
                                    style={{
                                        width: 24,
                                        height: 24,
                                        marginLeft: '26px',
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                        
                    ))}
                </List>
                <Button href="./clear">
                    Logout
                </Button>
            </Box>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>
                <Paper
                    // component="form"
                    className="hamburger-menu"
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 43,
                        borderRadius: '30px',
                    }}
                >
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                </Paper>
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
