import { Autocomplete, Box, Chip, Grid, TextField } from '@mui/material';
import {
  DataGridPremium,
  GridActionsCellItem,
  GridColDef,
  GridRowModel,
  GridRowParams,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid-premium';
import React, { FC } from 'react';

export type GridDemoProps = {
  stub?: boolean;
};

export type GridRowModelType = {
  id: number;
  name: string;
  age: number;
  accepted: boolean;
  city: string;
  tags: string[];
};

const cities = [
  {
    label: 'London',
    value: 'LON',
  },
  {
    label: 'Amsterdam',
    value: 'AMS',
  },
];

export const GridDemo: FC<GridDemoProps> = () => {
  const rows: GridRowModel<GridRowModelType>[] = [
    {
      id: 0,
      name: 'Vitalii Kravchenko',
      age: 38,
      accepted: true,
      city: 'LON',
      tags: ['engineer', 'male', 'tech'],
    },
    {
      id: 1,
      name: 'Narindra Rahmathya',
      age: 29,
      accepted: true,
      city: 'LON',
      tags: ['manager', 'female', 'finance'],
    },
    {
      id: 2,
      name: 'John Doe',
      age: 35,
      accepted: false,
      city: 'AMS',
      tags: ['doctor', 'male'],
    },
  ];

  return (
    <DataGridPremium
      sx={{
        width: '100%',
      }}
      columns={[
        {
          field: 'name',
          headerName: 'Name',
          type: 'string',
          flex: 2,
          sortComparator: (v1, v2, param1, param2) => {
            console.log(`v1: ${v1}, v2: ${v2}`, 'param1', param1, 'param2', param2);
            return 0;
          },
        } satisfies GridColDef<GridRowModelType, string>,
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          flex: 1,
        },
        {
          field: 'accepted',
          headerName: 'Accepted',
          type: 'boolean',
          editable: true,
          flex: 1,
        },
        {
          field: 'city',
          headerName: 'City',
          type: 'singleSelect',
          editable: true,
          valueOptions: cities,
          flex: 1,
        },
        {
          field: 'tags',
          headerName: 'Tags',
          type: 'multiSelect',
          editable: true,
          flex: 3,
          renderCell(params) {
            return (
              <Grid container direction="row" gap={1}>
                {params.row.tags.map((tag) => (
                  <Chip key={tag} label={tag} variant="outlined" />
                ))}
              </Grid>
            );
          },
          renderEditCell(params) {
            const { tags } = params.row;
            return <Autocomplete options={tags} renderInput={(params) => <TextField {...params} label="Tags" />} />;
          },
        },
        {
          field: 'actions',
          headerName: 'Actions',
          type: 'actions',
          getActions: (params: GridRowParams) => [
            <GridActionsCellItem key="1" onClick={(event) => {}} label="Delete" showInMenu />,
            <GridActionsCellItem key="2" onClick={() => {}} label="Print" showInMenu />,
          ],
        },
      ]}
      rows={rows}
      autoHeight
      slots={{
        toolbar: GridToolbarQuickFilter,
        noRowsOverlay: () => <div>No rows to show.</div>,
        noResultsOverlay: () => <div>Used filters gave no results.</div>,
      }}
    />
  );
};
