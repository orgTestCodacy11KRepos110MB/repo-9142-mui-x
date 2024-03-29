import * as React from 'react';
import LocalisationTable from 'docsx/src/modules/components/LocalizationTable';
import data from './data.json';

function PickersLocalisationTableNoSnap() {
  return <LocalisationTable data={data} />;
}

export default PickersLocalisationTableNoSnap;
