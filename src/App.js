import './App.css';
import PlanetFilter from './components/PlanetFilter';
import SortColumns from './components/SortColumns';
import Table from './components/Table';
import FilterProvider from './context/FilterProvider';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <TableProvider>
      <FilterProvider>
        <PlanetFilter />
        <SortColumns />
        <Table />
      </FilterProvider>
    </TableProvider>
  );
}

export default App;
