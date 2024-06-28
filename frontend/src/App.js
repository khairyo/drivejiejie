import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home'
import { LoginPage } from './pages/loginPage';
import { RegisterPage } from './pages/registerPage';


function App() {
    // MUI component custom styling (button)
    const buttonStyles = {
        backgroundColor: 'var(--primary-color)',
        borderRadius: 'var(--border-radius)',
        color: 'white',
        textTransform: 'none',
        fontFamily: 'var(--font-family)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        marginLeft: '10px',
    };

    // gas station dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [menuOpen, setMenuOpen] = useState(false);

    // const handleMenuClick = () => {
    //     setMenuOpen(true);
    // };

    const handleMenuClose = () => {
        setMenuOpen(false);
    };
    // const email = 'sushimallows8@gmail.com';
    const [email, setEmail] = useState('sushimallows8@gmail.com');
    const [userName, setUserName] = useState('Khairyo');

    return (
        <div className="App">
            <div className="menu-bar">
                <Menu
                    email={email}
                    userName={userName}
                    open={menuOpen}
                    onClose={handleMenuClose}
                />
                <Button sx={buttonStyles} variant="contained">
                    Carparks
                </Button>
                <Button
                    sx={buttonStyles}
                    variant="contained"
                    onClick={handleClickOpen}
                >
                    Gas stations
                </Button>
                <Button sx={buttonStyles} variant="contained">
                    Vehicle services
                </Button>
            </div>

            <MapComponent />

            <GasStationDialog open={open} onClose={handleClose} />
        </div>
    );
}

export default App;
