import {
  createTheme,
  type Theme,
  type ThemeOptions,
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
// import { green, purple } from '@mui/material/colors';
import React, { FC, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { PickerComponents } from '@mui/x-date-pickers/themeAugmentation';

// MUI theming: https://mui.com/material-ui/customization/theming/

// Module augmentation is the official way to add custom variables to the theme.
declare module '@mui/material/styles' {
  // for `useTheme`
  interface Theme {
    status: {
      danger: string;
    };
  }
  // for `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export type DesignContextValueType = {
  setThemeOptions: React.Dispatch<React.SetStateAction<ThemeOptions>>;
};

const DesignContext = React.createContext<DesignContextValueType>({
  setThemeOptions: () => {
    // The default setter will always throw. The valid state setter function will be provided by DesignProvider.
    throw new Error('Forgot to wrap component in DesignProvider');
  },
});

const useDesignContext = () => {
  return React.useContext(DesignContext);
};

const getPickerStyles = (theme: Theme): PickerComponents<Theme> => ({
  MuiPickersToolbar: {
    styleOverrides: {
      root: {
        backgroundColor: 'red',
      },
    },
  },
  MuiDateField: {
    defaultProps: {
      sx: {
        '& input': {},
      },
    },
  },
  MuiDatePicker: {},
  MuiDateCalendar: {
    styleOverrides: {
      root: {
        backgroundColor: 'red',
        color: 'yellow',
        '& .MuiPickersCalendarHeader-switchViewButton, .MuiPickersArrowSwitcher-button': {
          color: 'white',
        },
        '& .MuiDayCalendar-weekDayLabel': {
          color: 'yellow',
          fontWeight: 'bold',
        },
        '& .MuiPickersDay-root': {
          color: 'white',
        },
      },
    },
  },
  // MuiCalendarPicker: {},
});

export type CustomThemeContextProps = {
  children?: React.ReactNode;
};

const DesignProvider: FC<CustomThemeContextProps> = (props) => {
  const { children } = props;
  const [themeOptions, setThemeOptions] = useState<ThemeOptions>({
    palette: {
      mode: 'light',
    },
    status: {
      danger: 'lol',
    },
  });

  const theme = useMemo(() => {
    let theme = createTheme(
      // Only the first argument (`options`) is processed by the `createTheme` function,
      // so we have to use `deepmerge` here.
      deepmerge(
        {
          // vars: {} // error - this is a private name for CSS theme variables
          // palette: {
          //   primary: {
          //     main: purple[500],
          //   },
          //   secondary: {
          //     main: green[500],
          //   },
          // },
          components: {
            MuiAutocomplete: {
              defaultProps: {},
            },
          },
        } satisfies ThemeOptions,
        themeOptions
      )
    );

    // Using theme options to define other options.
    theme = createTheme(theme, {
      components: {
        ...getPickerStyles(theme),
      },
    });

    return theme;
  }, [themeOptions]);

  const designContextValue = useMemo(() => {
    return {
      setThemeOptions,
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <DesignContext.Provider value={designContextValue}>{children}</DesignContext.Provider>
    </ThemeProvider>
  );
};

// const cssVarsTheme = extendTheme({
//   cssVarPrefix: 'vk',
//   colorSchemes: {
//     light: {
//       palette: {
//         background: {
//           paper: 'red',
//         },
//       },
//     },
//     dark: {},
//   },
// });

/**
 * Experimental CSS Theme variables:
 * https://mui.com/material-ui/experimental-api/css-theme-variables/usage/
 *
 * `useColorScheme` must be called under `<CssVarsProvider />`:
 *
 *     const { mode, setMode, systemMode } = useColorScheme();
 *     <Button onClick={() => setMode('light')}>Light Mode</Button>
 */
// export const CssVarsBasic: FC = () => {
//   return <CssVarsProvider theme={cssVarsTheme}>Hello world</CssVarsProvider>;
// };

export { DesignProvider, useDesignContext };
