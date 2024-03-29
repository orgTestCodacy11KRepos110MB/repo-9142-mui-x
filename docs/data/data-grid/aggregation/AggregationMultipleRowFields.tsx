import * as React from 'react';
import {
  DataGridPremium,
  GridAggregationFunction,
  GridColDef,
  GRID_AGGREGATION_FUNCTIONS,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';
import { useMovieData } from '@mui/x-data-grid-generator';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function calculateProfit(gross: number, budget: number) {
  return (gross - budget) / budget;
}

const COLUMNS: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 200, groupable: false },
  {
    field: 'company',
    headerName: 'Company',
    width: 200,
  },
  {
    field: 'profit',
    headerName: 'Profit',
    type: 'number',
    width: 70,
    groupable: false,
    valueGetter: ({ row }) => {
      if (!row.gross || !row.budget) {
        return null;
      }
      return calculateProfit(row.gross, row.budget);
    },
    valueFormatter: ({ value }) => {
      if (!value) {
        return null;
      }
      return `${Math.round(value * 100)}%`;
    },
  },
  {
    field: 'gross',
    headerName: 'Gross',
    type: 'number',
    minWidth: 140,
    groupable: false,
    valueFormatter: ({ value }) => {
      if (!value) {
        return value;
      }
      return currencyFormatter.format(value);
    },
  },
  {
    field: 'budget',
    headerName: 'Budget',
    type: 'number',
    minWidth: 140,
    groupable: false,
    valueFormatter: ({ value }) => {
      if (!value) {
        return value;
      }
      return currencyFormatter.format(value);
    },
  },
];

const profit: GridAggregationFunction<{ gross: number; budget: number }, number> = {
  label: 'profit',
  getCellValue: ({ row }) => ({ budget: row.budget, gross: row.gross }),
  apply: ({ values }) => {
    let budget = 0;
    let gross = 0;
    values.forEach((value) => {
      if (value) {
        gross += value.gross;
        budget += value.budget;
      }
    });
    return calculateProfit(gross, budget);
  },
  columnTypes: ['number'],
};

export default function AggregationMultipleRowFields() {
  const data = useMovieData();
  const apiRef = useGridApiRef();

  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      rowGrouping: {
        model: ['company'],
      },
      aggregation: {
        model: {
          gross: 'sum',
          budget: 'sum',
          profit: 'profit',
        },
      },
    },
  });

  return (
    <div style={{ height: 370, width: '100%' }}>
      <DataGridPremium
        {...data}
        apiRef={apiRef}
        columns={COLUMNS}
        disableSelectionOnClick
        initialState={initialState}
        aggregationFunctions={{ ...GRID_AGGREGATION_FUNCTIONS, profit }}
        experimentalFeatures={{ aggregation: true }}
      />
    </div>
  );
}
