import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Table() {
  const { dataPlanets, isLoading } = useContext(TableContext);

  if (isLoading || !dataPlanets.results.length) {
    return <h3>Carregando...</h3>;
  }

  console.log(dataPlanets);
  const planets = Object.keys(dataPlanets.results[0]);

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
          {dataPlanets.results.map((row) => (
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

export default Table;
