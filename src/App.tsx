import React, { useCallback, useEffect } from 'react';
import { useMediaQuery, Box } from '@mui/material';
import { useDesignContext } from './Theme';

export function App() {
  const { setThemeOptions } = useDesignContext();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const useSystemColorTheme = useCallback(
    () => setThemeOptions({ palette: { mode: prefersDarkMode ? 'dark' : 'light' } }),
    [prefersDarkMode, setThemeOptions]
  );

  useEffect(() => useSystemColorTheme(), [useSystemColorTheme]);

  return (
    <Box display="flex" flexDirection="column" padding={5}>
      <h2>Links</h2>
      <a href="/gql">GraphQL</a>
      <a href="/mui">MUI</a>
      <a href="/interview">Interview</a>
    </Box>
  );
}
