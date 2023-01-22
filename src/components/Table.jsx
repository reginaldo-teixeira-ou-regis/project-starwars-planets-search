import React, { useContext } from 'react';
import { FilterContext } from '../context/FilterProvider';
import { TableContext } from '../context/TableProvider';

function Table() {
  const { dataPlanets, isLoading } = useContext(TableContext);
  const { planetsFilter, buttonFilter } = useContext(FilterContext);

  if (isLoading || !dataPlanets.results.length) {
    return <h3>Carregando...</h3>;
  }

  let filterData = dataPlanets.results;

  const planets = Object.keys(dataPlanets.results[0]);

  if (planetsFilter) {
    filterData = filterData.filter((planet) => planet.name.toLowerCase()
      .includes(planetsFilter.toLowerCase()));
  }

  if (Object.keys(buttonFilter).length) {
    filterData = filterData.filter((infoData) => {
      if (buttonFilter.operatorFilter === 'maior que') {
        return +infoData[buttonFilter.columnFilter] > +buttonFilter.valueFilter;
      }
      if (buttonFilter.operatorFilter === 'menor que') {
        return +infoData[buttonFilter.columnFilter] < +buttonFilter.valueFilter;
      }
      if (buttonFilter.operatorFilter === 'igual a') {
        return +infoData[buttonFilter.columnFilter] === +buttonFilter.valueFilter;
      }
      return infoData;
    });
  }

  /* if (Object.keys(buttonFilter).length) {
    if (buttonFilter.operatorFilter === 'maior que') {
      filterData = filterData.filter((planet) => +planet[buttonFilter.columnFilter]
      > buttonFilter.valueFilter);
    } else if (buttonFilter.operatorFilter === 'menor que') {
      filterData = filterData.filter((planet) => +planet[buttonFilter.columnFilter]
        < buttonFilter.valueFilter);
    } else if (buttonFilter.operatorFilter === 'igual a') {
      filterData = filterData.filter((planet) => planet[buttonFilter.columnFilter]
        === buttonFilter.valueFilter);
    }
  } */

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
                .map((valueInfo) => <td key={ valueInfo }>{valueInfo}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
