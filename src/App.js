import React, { useState } from 'react';
import './App.css';
import PlanetFilter from './components/PlanetFilter';
import Table from './components/Table';
import TableProvider from './context/TableProvider';

function App() {
  const [nameFilter, setNameFilter] = useState('');
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [value, setValue] = useState('0');
  const [button, setButton] = useState({});

  return (
    <TableProvider>
      <PlanetFilter
        nameFilter={ {
          nameFilter,
          setNameFilter,
          column,
          setColumn,
          operator,
          setOperator,
          value,
          setValue,
          setButton,
        } }
      />
      <Table filter={ nameFilter } button={ button } />
    </TableProvider>
  );
}

export default App;
