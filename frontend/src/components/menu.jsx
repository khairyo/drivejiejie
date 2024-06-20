import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setOpen(open);
    };

    return (
        <div>
            <Paper
                className="hamburger-menu"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 43,
                    borderRadius: '30px',
                }}
            >
                <IconButton
                    sx={{ p: '10px' }}
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
            </Paper>
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <div
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <ListItem>
                            <div className="sidebar-header">
                                <div className="profile-pic"></div>
                                <h2>Hi, khairyo!</h2>
                                <p>sushimallows8@gmail.com</p>
                            </div>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Tips" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}
