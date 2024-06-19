import * as React from 'react';
import Box from '@mui/material/Box';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

import { TreeView } from '@mui/x-tree-view/TreeView';

export default function TreeViewDemo() {
  return (
    <Box sx={{ minHeight: 220, flexGrow: 1, maxWidth: 300 }}>
      <TreeView
        defaultCollapseIcon={<ChevronDownIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
      ></TreeView>
    </Box>
  );
}
