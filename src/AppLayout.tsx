import React, { FC, useCallback } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { useDesignContext } from './Theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ButtonGroup, styled, useTheme } from '@mui/material';
import { NavList } from './NavList';

const drawerWidth = 150;
const appBarHeight = 64;

type Route = {
  name: string;
  path: string;
};

export type AppLayoutProps = {
  routes: Route[];
};

export const AppLayout: FC<AppLayoutProps> = ({ routes }) => {
  const { setThemeOptions } = useDesignContext();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const useSystemColorTheme = useCallback(
    () => setThemeOptions({ palette: { mode: prefersDarkMode ? 'dark' : 'light' } }),
    [prefersDarkMode, setThemeOptions]
  );

  // useEffect(() => useSystemColorTheme(), [useSystemColorTheme]);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <CssBaseline />
      <Toolbar
        sx={{
          position: 'fixed',
          width: '100%',
        }}
      >
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ marginRight: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <ButtonGroup>
          <Button onClick={() => setThemeOptions({ palette: { mode: 'light' } })}>Light</Button>
          <Button onClick={useSystemColorTheme}>System</Button>
          <Button onClick={() => setThemeOptions({ palette: { mode: 'dark' } })}>Dark</Button>
        </ButtonGroup>
      </Toolbar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={document.body}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiPaper-root': { marginTop: `${appBarHeight}px` },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <NavList routes={routes} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiPaper-root': { marginTop: `${appBarHeight}px` },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <NavList routes={routes} />
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, marginTop: `${appBarHeight}px` }}>
        <Outlet />
      </Box>
    </Box>
  );
};

const Toolbar = styled('div')(({ theme }) => ({
  display: 'flex',
  borderBottom: `1px solid ${theme.palette.divider}`,
  height: `${appBarHeight}px`,
  flexDirection: 'row',
  alignItems: 'center',
  padding: '0 12px',
}));
