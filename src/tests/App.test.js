import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import TableProvider from '../context/TableProvider';
import { act } from 'react-dom/test-utils';

describe('Testing the component App', () => {
  afterEach(() => jest.clearAllMocks());
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = mockFetch;
  });

  it("Testing if the filter per name are it's working normally", async () => {
    render(<App />);

    const inputName = await screen.findByTestId('name-filter');
    expect(inputName).toBeInTheDocument();

    userEvent.type(inputName, 'na')
    expect(await screen.findByRole('cell', { name: /Naboo/i })).toBeInTheDocument();
  });

  it("Testing if the numerics filters are it's working normally when we add in the inputs 'rotation_period', 'igual a' and '23'", async () => {
    render(<App />);

    const columnFilter = await screen.findByTestId("column-filter");
    const operatorFilter = await screen.findByTestId("comparison-filter");
    const valueFilter = await screen.findByTestId("value-filter");
    const buttonFilter = await screen.findByTestId("button-filter");

    expect(columnFilter).toBeInTheDocument();
    expect(operatorFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(operatorFilter, 'igual a');
    valueFilter.value = '';
    userEvent.type(valueFilter, '23');
    fireEvent.click(buttonFilter);

    expect(await screen.findByRole('cell', { name: /tatooine/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /Hoth/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /Dagobah/i })).toBeInTheDocument();
  });

  it("Testing if the numerics filters are it's working normally when we add in the inputs 'population', 'menor que' and '30000000'", async () => {
    render(<App />);

    const columnFilter = await screen.findByTestId("column-filter");
    const operatorFilter = await screen.findByTestId("comparison-filter");
    const valueFilter = await screen.findByTestId("value-filter");
    const buttonFilter = await screen.findByTestId("button-filter");

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(operatorFilter, 'menor que');
    valueFilter.value = '';
    userEvent.type(valueFilter, '30000000');
    fireEvent.click(buttonFilter);

    expect(await screen.findByRole('cell', { name: /Tatooine/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /Yavin IV/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /Bespin/i })).toBeInTheDocument();
  });

  it("Testing if the numerics filters are it's working normally when we add in the inputs 'diameter', 'maior que' and '12400'", async () => {
    render(<App />);

    const columnFilter = await screen.findByTestId("column-filter");
    const operatorFilter = await screen.findByTestId("comparison-filter");
    const valueFilter = await screen.findByTestId("value-filter");
    const buttonFilter = await screen.findByTestId("button-filter");

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(operatorFilter, 'maior que');
    valueFilter.value = '';
    userEvent.type(valueFilter, '12400');
    fireEvent.click(buttonFilter);

    expect(await screen.findByRole('cell', { name: /Alderaan/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /Bespin/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /Kamino/i })).toBeInTheDocument();
  });

  it("Testing if the button 'X' remove the numeric filter", async () => {
    render(<App />);

    const columnFilter = await screen.findByTestId("column-filter");
    const operatorFilter = await screen.findByTestId("comparison-filter");
    const valueFilter = await screen.findByTestId("value-filter");
    const buttonFilter = await screen.findByTestId("button-filter");

    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.selectOptions(operatorFilter, 'menor que');
    valueFilter.value = '';
    userEvent.type(valueFilter, '1');
    fireEvent.click(buttonFilter);

    const surface_water_menor_que_1 = screen.getByText(/surface_water menor que 1/i)
    expect(surface_water_menor_que_1).toBeInTheDocument();

    expect(await screen.findByRole('cell', { name: /Bespin/i })).toBeInTheDocument();

    const buttonX = screen.getByRole('button', { name: 'x' })
    expect(buttonX).toBeInTheDocument();

    fireEvent.click(buttonX);

    expect(surface_water_menor_que_1).not.toBeInTheDocument();

    const planetName = await screen.findAllByTestId('planet-name');
    expect(planetName).toHaveLength(10);
  });

  it("Testing if the button 'REMOVER TODOS OS FILTROS' removes all numeric filters add", async () => {
    render(<App />);

    const columnFilter = await screen.findByTestId("column-filter");
    const operatorFilter = await screen.findByTestId("comparison-filter");
    const valueFilter = await screen.findByTestId("value-filter");
    const buttonFilter = await screen.findByTestId("button-filter");

    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(operatorFilter, 'igual a');
    valueFilter.value = '';
    userEvent.type(valueFilter, '312');
    fireEvent.click(buttonFilter);

    const orbital_period_igual_a_312 = screen.getByText(/orbital_period igual a 312/i)
    expect(orbital_period_igual_a_312).toBeInTheDocument();

    expect(await screen.findByRole('cell', { name: /Naboo/i })).toBeInTheDocument();

    const buttonAllFilters = await screen.findByTestId("button-remove-filters");
    expect(buttonAllFilters).toBeInTheDocument();

    fireEvent.click(buttonAllFilters);

    expect(orbital_period_igual_a_312).not.toBeInTheDocument();

    const planetName = await screen.findAllByTestId('planet-name');
    expect(planetName).toHaveLength(10);
  });

  it("Testing if is possible ordered the columns in ascending order", async () => {
    render(<App />);

    const columnSort = await screen.findByTestId('column-sort');
    const orderButton = await screen.findByTestId('column-sort-button');
    const radioASC = await screen.findByTestId('column-sort-input-asc');

    expect(columnSort).toBeInTheDocument();
    expect(orderButton).toBeInTheDocument();
    expect(radioASC).toBeInTheDocument();

    userEvent.selectOptions(columnSort, 'population');
    fireEvent.click(radioASC);
    fireEvent.click(orderButton);

    const planetName = await screen.findAllByTestId('planet-name');
    expect(planetName).toHaveLength(10);
    expect(planetName[0]).toHaveTextContent('Yavin IV');
    expect(planetName[9]).toHaveTextContent('Dagobah');
  });

  it("Testing if is possible ordered the columns in descending order", async () => {
    render(<App />);

    const columnSort = await screen.findByTestId('column-sort');
    const orderButton = await screen.findByTestId('column-sort-button');
    const radioDESC = await screen.findByTestId('column-sort-input-desc');

    userEvent.selectOptions(columnSort, 'diameter');
    fireEvent.click(radioDESC);
    fireEvent.click(orderButton);

    const planetName = await screen.findAllByTestId('planet-name');
    expect(planetName).toHaveLength(10);
    expect(planetName[0]).toHaveTextContent('Bespin');
    expect(planetName[9]).toHaveTextContent('Endor');
  });

  it("Testing if each filter each with its button is being removed individually", async () => {
    render(<App />);

    const columnFilter = await screen.findByTestId("column-filter");
    const operatorFilter = await screen.findByTestId("comparison-filter");
    const valueFilter = await screen.findByTestId("value-filter");
    const buttonFilter = await screen.findByTestId("button-filter");

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(operatorFilter, 'maior que');
    valueFilter.value = '';
    userEvent.type(valueFilter, '500');
    fireEvent.click(buttonFilter);
    const population_maior_que_500 = screen.getByText(/population maior que 500/i)
    expect(population_maior_que_500).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(operatorFilter, 'menor que');
    valueFilter.value = '';
    userEvent.type(valueFilter, '20000');
    fireEvent.click(buttonFilter);
    const diameter_menor_que_20000 = screen.getByText(/diameter menor que 20000/i)
    expect(diameter_menor_que_20000).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(operatorFilter, 'maior que');
    valueFilter.value = '';
    userEvent.type(valueFilter, '350');
    fireEvent.click(buttonFilter);
    const orbital_period_maior_que_350 = screen.getByText(/orbital_period maior que 350/i)
    expect(orbital_period_maior_que_350).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(operatorFilter, 'igual a');
    valueFilter.value = '';
    userEvent.type(valueFilter, '24');
    fireEvent.click(buttonFilter);
    const rotation_period_igual_a_24 = screen.getByText(/rotation_period igual a 24/i)
    expect(rotation_period_igual_a_24).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.selectOptions(operatorFilter, 'menor que');
    valueFilter.value = '';
    userEvent.type(valueFilter, '10');
    fireEvent.click(buttonFilter);
    const surface_water_menor_que_10 = screen.getByText(/surface_water menor que 10/i)
    expect(surface_water_menor_que_10).toBeInTheDocument();

    expect(await screen.findByRole('cell', { name: /Yavin IV/i })).toBeInTheDocument();

    const buttonX1 = await screen.findByTestId("population maior que 5000");
    expect(buttonX1).toBeInTheDocument();

    const buttonX2 = await screen.findByTestId("diameter menor que 200001");
    expect(buttonX2).toBeInTheDocument();

    const buttonX3 = await screen.findByTestId("orbital_period maior que 3502");
    expect(buttonX3).toBeInTheDocument();

    const buttonX4 = await screen.findByTestId("rotation_period igual a 243");
    expect(buttonX4).toBeInTheDocument();

    const buttonX5 = await screen.findByTestId("surface_water menor que 104");
    expect(buttonX5).toBeInTheDocument();

    fireEvent.click(buttonX5);
    expect(buttonX5).not.toBeInTheDocument();
    expect(surface_water_menor_que_10).not.toBeInTheDocument();
    expect(rotation_period_igual_a_24).toBeInTheDocument();
    expect(orbital_period_maior_que_350).toBeInTheDocument();
    expect(diameter_menor_que_20000).toBeInTheDocument();
    expect(population_maior_que_500).toBeInTheDocument();

    fireEvent.click(buttonX4);
    expect(buttonX4).not.toBeInTheDocument();
    expect(rotation_period_igual_a_24).not.toBeInTheDocument();
    expect(orbital_period_maior_que_350).toBeInTheDocument();
    expect(diameter_menor_que_20000).toBeInTheDocument();
    expect(population_maior_que_500).toBeInTheDocument();

    fireEvent.click(buttonX3);
    expect(buttonX3).not.toBeInTheDocument();
    expect(orbital_period_maior_que_350).not.toBeInTheDocument();
    expect(diameter_menor_que_20000).toBeInTheDocument();
    expect(population_maior_que_500).toBeInTheDocument();

    fireEvent.click(buttonX2);
    expect(buttonX2).not.toBeInTheDocument();
    expect(diameter_menor_que_20000).not.toBeInTheDocument();
    expect(population_maior_que_500).toBeInTheDocument();

    fireEvent.click(buttonX1);
    expect(buttonX1).not.toBeInTheDocument();
    expect(population_maior_que_500).not.toBeInTheDocument();
  });
});

describe('Testing the errors', () => {
  it('Testing the message of error', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Failed to fetch'));

    const { getByText } = render(<App />);

    await waitFor(() => {
      const errorMessage = getByText(/Ops, algo de errado não está certo Error: Failed to fetch/);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
