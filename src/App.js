import React, { useState } from 'react';
import './App.css';
import PlanetFilter from './components/PlanetFilter';
import Table from './components/Table';
import TableProvider from './context/TableProvider';

function App() {
  const [nameFilter, setNameFilter] = useState('');

  return (
    <TableProvider>
      <PlanetFilter nameFilter={ { nameFilter, setNameFilter } } />
      <Table filter={ nameFilter } />
    </TableProvider>
  );
}

export default App;
