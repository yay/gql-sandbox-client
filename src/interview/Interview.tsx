import { Box, Tab, Tabs } from '@mui/material';
import React, { FC } from 'react';

// import { HeaderTest } from './examples/columns/HeaderTest';
// import { ParentComponent } from './examples/Memo';
// import { Header, NoJsxHeader } from './examples/NoJSX';
// import { ProductList } from './examples/ProductList';
// import { ReduxComponent } from './examples/redux/Redux';
// import { EffectComponent } from './examples/UseEffect';
// import { RandomComponent } from './examples/UseState';

export const Interview: FC = () => {
  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Item One" />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" />
      </Tabs>
    </Box>
  );
};
