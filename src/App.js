import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Home from './components/Home';
import EmailIcon from '@mui/icons-material/Email';

import {
  NavLink,
  Navigate,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Contact from './components/Contact';
import About from './components/About';


function App() {
  const [state, setState] = useState({
    left: false,
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <h3>FOOD<span>NINJA</span></h3>
        {['Home', 'About'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <NavLink to={text}>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Contact'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <NavLink to={text} className='contact'>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );




  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <NavLink to='/'>
            <h3>FOOD<span>NINJA</span></h3>
          </NavLink>
          
          <div className='burger'>
            {['right'].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path='/Contact' element={<Contact />} />

          <Route path='/About' element={<About />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>



      </BrowserRouter>
    </div>
  );
}

export default App;
