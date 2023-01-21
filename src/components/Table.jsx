import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Table({ filter, button }) {
  const { dataPlanets, isLoading } = useContext(TableContext);

  if (isLoading || !dataPlanets.results.length) {
    return <h3>Carregando...</h3>;
  }

  const planets = Object.keys(dataPlanets.results[0]);

  let planetFilter = dataPlanets.results
    .filter((planet) => planet.name.toLowerCase().includes(filter.toLowerCase()));

  if (Object.keys(button).length) {
    console.log(typeof planetFilter[0].population, typeof button.value);
    if (button.operator === 'maior que') {
      planetFilter = planetFilter
        .filter((planet) => +planet[button.column] > button.value);
    } else if (button.operator === 'menor que') {
      planetFilter = planetFilter
        .filter((planet) => +planet[button.column] < button.value);
    } else if (button.operator === 'igual a') {
      planetFilter = planetFilter
        .filter((planet) => planet[button.column] === button.value);
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            {planets.map((row) => (
              <th key={ row }>{row}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planetFilter.map((row) => (
            <tr key={ row.name }>
              {Object.values(row)
                .map((row1) => <td key={ row1 }>{row1}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  button: PropTypes.shape({
    column: PropTypes.string,
    operator: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  filter: PropTypes.string.isRequired,
};

export default Table;
