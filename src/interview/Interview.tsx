import React, { FC } from 'react';
import { Box, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { NavList } from '../NavList';

export const Interview: FC = () => {
  const theme = useTheme();
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ width: '150px', borderRight: `1px solid ${theme.palette.divider}` }}>
        <NavList
          routes={[
            {
              path: 'memo',
            },
            {
              path: 'no-jsx',
            },
            {
              path: 'product-list',
            },
            {
              path: 'use-effect',
            },
            {
              path: 'uncontrolled',
            },
            {
              path: 'dropzone',
            },
            {
              path: 'suspense',
            },
          ]}
        />
      </Box>
      <Box sx={{ flex: 1, padding: '10px', overflow: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  );
};
