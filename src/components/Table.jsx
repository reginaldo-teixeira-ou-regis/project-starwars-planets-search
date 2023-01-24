import React, { useContext } from 'react';
import { FilterContext } from '../context/FilterProvider';
import { TableContext } from '../context/TableProvider';

function Table() {
  const { dataPlanets, isLoading } = useContext(TableContext);
  const { planetsFilter, newState } = useContext(FilterContext);

  if (isLoading || !dataPlanets.results.length || !newState) {
    return <h3>Carregando...</h3>;
  }

  let filterData = newState;

  const planets = Object.keys(dataPlanets.results[0]);

  if (planetsFilter) {
    filterData = filterData.filter((planet) => planet.name.toLowerCase()
      .includes(planetsFilter.toLowerCase()));
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            {planets.map((planet) => (
              <th key={ planet }>{planet}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterData.map((dataInfo) => (
            <tr key={ dataInfo.name }>
              {Object.values(dataInfo)
                .map((valueInfo) => {
                  if (valueInfo === dataInfo.name) {
                    return (
                      <td
                        key={ valueInfo }
                        data-testid="planet-name"
                      >
                        {valueInfo}
                      </td>
                    );
                  }
                  return <td key={ valueInfo }>{valueInfo}</td>;
                })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
