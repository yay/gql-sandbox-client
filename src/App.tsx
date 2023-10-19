import React, { useCallback, useEffect } from 'react';
import { Grid, Button, useMediaQuery, Box } from '@mui/material';
import { Button as BaseButton } from '@mui/base';
import { /* CssVarsBasic, */ useDesignContext } from './Theme';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { GridDemo } from './GridDemo';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

function App() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const { setThemeOptions } = useDesignContext();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const useSystemColorTheme = useCallback(
    () => setThemeOptions({ palette: { mode: prefersDarkMode ? 'dark' : 'light' } }),
    [prefersDarkMode, setThemeOptions]
  );

  useEffect(() => useSystemColorTheme(), [useSystemColorTheme]);

  return (
    <Box
      // `sx` is a shortcut for defining custom styles that has access to the theme:
      // https://mui.com/system/getting-started/the-sx-prop/
      // https://mui.com/system/properties/
      // https://mui.com/material-ui/customization/breakpoints/
      sx={{
        height: '100%',
        padding: 2,
        boxSizing: 'border-box',
        // bgcolor: 'background.paper', // this token fetches theme value and is equivalent to code below
        backgroundColor: (theme) => theme.palette.background.paper, // type-safe unlike the above
      }}
    >
      <Grid container direction={'column'} rowGap={2}>
        <Grid container direction={'row'} columnGap={2} alignItems={'center'}>
          <Button variant={'outlined'}>Material Button</Button>
          <BaseButton>Base Button</BaseButton>
          <Button onClick={() => setThemeOptions({ palette: { mode: 'light' } })}>Light</Button>
          <Button onClick={() => setThemeOptions({ palette: { mode: 'dark' } })}>Dark</Button>
          <Button onClick={useSystemColorTheme}>System</Button>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Pick a date" value={date} onChange={(newDate) => setDate(newDate)} />
        </LocalizationProvider>
        {/* <CssVarsBasic /> */}
        <GridDemo />
      </Grid>
    </Box>
  );
}

export default App;
