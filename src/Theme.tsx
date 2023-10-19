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

const getPickerStyles = (): PickerComponents<Theme> => ({
  MuiPickersToolbar: {},
  MuiDatePicker: {},
  MuiDateCalendar: {},
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
    return createTheme(
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
            ...getPickerStyles(),
            MuiAutocomplete: {
              defaultProps: {},
            },
          },
        } satisfies ThemeOptions,
        themeOptions
      )
    );
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
