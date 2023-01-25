import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockData from './helpers/mockData';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';

afterEach(() => jest.clearAllMocks());

describe('Testing the component App', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = mockFetch;
  });

  it('Testing if the title pops up in App', () => {
    render(<App />);
    const title = screen.getByRole('heading', { name: /project starwars planets search/i })
    expect(title).toBeInTheDocument();
  });

  it("Testing if the table it's rendering normally", async () => {
    render(<App />);

    await waitFor(() => { expect(screen.getByTestId('name-filter')).toBeInTheDocument(); }, { timeout: 15000 });
    const tablePlanetsInfo = await screen.findByRole('table');
    expect(tablePlanetsInfo).toBeInTheDocument();
  });

  it("Testing if when typing 'na' in input renders the planet 'Naboo'", async () => {
    render(<App />);

    const inputNamePlanet = await screen.findByTestId('name-filter')
    expect(inputNamePlanet).toBeInTheDocument();

    userEvent.type(inputNamePlanet, 'na');

    const planetsID = await screen.findAllByTestId('planet-name');
    expect(planetsID).toHaveLength(1);
    const planetNaboo = await screen.findByRole('cell', { name: /Naboo/i });
    expect(planetNaboo).toBeInTheDocument();
  });

  it("Testing if when typing 'oo' in input renders the planets 'Naboo' and 'tatooine'", async () => {
    render(<App />);

    const inputNamePlanet = await screen.findByTestId('name-filter')
    expect(inputNamePlanet).toBeInTheDocument();

    userEvent.type(inputNamePlanet, 'oo');
    const planetsID = await screen.findAllByTestId('planet-name');
    expect(planetsID).toHaveLength(2);
    const planetTatooine = await screen.findByRole('cell', { name: /tatooine/i })
    expect(planetTatooine).toBeInTheDocument();
    const planetNaboo = await screen.findByRole('cell', { name: /Naboo/i });
    expect(planetNaboo).toBeInTheDocument();
  });

  it("Testing if when typing 'etgyher' in input not renders none planet", async () => {
    render(<App />);

    const inputNamePlanet = await screen.findByTestId('name-filter')
    expect(inputNamePlanet).toBeInTheDocument();

    userEvent.type(inputNamePlanet, 'etgyher');
    const planetsID = screen.findAllByTestId('planet-name');
    expect(planetsID).not.toContain();
  });

  it("Testing if the numerics filters are it's working normally", async () => {
    render(<App />);

    const columnFilter = screen.getByTestId("column-filter");
    const operatorFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    expect(columnFilter).toBeInTheDocument();
    expect(operatorFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(operatorFilter, 'igual a');
    valueFilter.value = '';
    userEvent.type(valueFilter, '23');
    userEvent.click(buttonFilter);

    const rotation_period_igual_a_23 = screen.getByText(/rotation_period igual a 23/i)
    expect(rotation_period_igual_a_23).toBeInTheDocument();

    expect(await screen.findByRole('cell', { name: /tatooine/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /Hoth/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /Dagobah/i })).toBeInTheDocument();
  });
});

// it('Testing if the title pops up in App', () => {
// });

/*  44.73 | 13.79 | 37.5 | 46.15  */
/*  58.33 | 37.93 |  52  | 58.9  */
/*  66.02 | 37.93 |  68  | 66.43 */
