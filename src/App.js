import './App.css';
import PlanetFilter from './components/PlanetFilter';
import Table from './components/Table';
import FilterProvider from './context/FilterProvider';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <TableProvider>
      <FilterProvider>
        <PlanetFilter />
        <Table />
      </FilterProvider>
    </TableProvider>
  );
}

export default App;
