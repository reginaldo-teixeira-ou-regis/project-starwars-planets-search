import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Table({ filter }) {
  const { dataPlanets, isLoading } = useContext(TableContext);

  if (isLoading || !dataPlanets.results.length) {
    return <h3>Carregando...</h3>;
  }

  const planets = Object.keys(dataPlanets.results[0]);

  const planetFilter = dataPlanets.results
    .filter((planet) => planet.name.toLowerCase().includes(filter.toLowerCase()));

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
  filter: PropTypes.string.isRequired,
};

export default Table;
