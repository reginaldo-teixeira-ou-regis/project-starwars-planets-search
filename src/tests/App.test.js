import { render, screen } from '@testing-library/react';
import App from '../App';
import mockData from './helpers/mockData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import TableProvider from '../context/TableProvider';
import FilterProvider from '../context/FilterProvider';
// import PlanetFilter from '../components/PlanetFilter';
// import SortColumns from '../components/SortColumns';
// import Table from '../components/Table';

afterEach(() => jest.clearAllMocks());

describe('Testing the component App', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    // render(<App />)
    act(async () => render(
    <TableProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </TableProvider>,
    ));
  });

  it('Testing if the title pops up in App', () => {
    const title = screen.queryByRole('heading', { name: /project starwars planets search/i })
    expect(title).toBeDefined();
  });

  it("Testing if the field of search it's working normally", async () => {
    const inputNamePlanet = screen.queryByPlaceholderText(/filtar planetas/i)
    expect(inputNamePlanet).toBeDefined();

    const planetTatooine = screen.queryByRole('cell', { name: /tatooine/i })
    expect(planetTatooine).toBeDefined();

    userEvent.type(inputNamePlanet, 'na');

    const planetNaboo = screen.findByRole('cell', {
      name: /Naboo/i
    });
    expect(planetNaboo).toBeDefined();
  });

  it("Testing if the numerics filters are it's working normally", async () => {
    const columnFilter = screen.queryByTestId("column-filter");
    const operatorFilter = screen.queryByTestId("comparison-filter");
    const valueFilter = screen.queryByTestId("value-filter");
    const buttonFilter = screen.queryByTestId("button-filter");

    expect(columnFilter).toBeDefined();
    expect(operatorFilter).toBeDefined();
    expect(valueFilter).toBeDefined();
    expect(buttonFilter).toBeDefined();

    /* userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(operatorFilter, 'igual a');
    valueFilter.value = '';
    userEvent.type(valueFilter, '23');
    userEvent.click(buttonFilter);

    expect(screen.getByRole('cell', { name: /tatooine/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /Hoth/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /Dagobah/i })).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /Naboo/i })).not.toBeInTheDocument(); */
  });
});

// it('Testing if the title pops up in App', () => {
// });

/* await act(async () => render(
    <TableProvider>
      <FilterProvider>
        <PlanetFilter />
        <SortColumns />
        <Table />
      </FilterProvider>
    </TableProvider>,
)); */

/*  44.73 | 13.79 | 37.5 | 46.15  */
