import React, { useContext, useEffect, useState } from 'react';
import { TableContext } from '../context/TableProvider';
import { FilterContext } from '../context/FilterProvider';

function SortColumns() {
  const { dataPlanets } = useContext(TableContext);
  const { setNewState } = useContext(FilterContext);
  const [column, setColumn] = useState('population');
  const [order, setOrder] = useState('ASC');
  const [data, setData] = useState(dataPlanets.results);

  useEffect(() => {
    setData(dataPlanets.results);
  }, [dataPlanets.results]);

  const handleColumnChange = (e) => {
    setColumn(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleSubmit = (e, col, ord) => {
    e.preventDefault();
    const orderReduceSort = data.reduce((acc, curr) => {
      if (curr[col] === 'unknown') {
        acc.push(curr);
      } else {
        const i = acc.findIndex((planet) => planet[col] === 'unknown');
        acc.splice(i, 0, curr);
      }
      return acc;
    }, []);
    const filtered = ord === 'ASC' ? orderReduceSort.sort((a, b) => a[col] - b[col])
      : orderReduceSort.sort((a, b) => b[col] - a[col]);
    setNewState(filtered);
  };

  return (
    <div>
      <form onSubmit={ (e) => { handleSubmit(e, column, order); } }>
        <label htmlFor="column-sort">
          Ordenar:
          <select
            id="column-sort"
            data-testid="column-sort"
            value={ column }
            onChange={ handleColumnChange }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="ASC">
          <input
            id="ASC"
            type="radio"
            name="sortOrder"
            data-testid="column-sort-input-asc"
            value="ASC"
            checked={ order === 'ASC' }
            onChange={ handleOrderChange }
          />
          ASC
        </label>
        <label htmlFor="DESC">
          <input
            id="DESC"
            type="radio"
            name="sortOrder"
            data-testid="column-sort-input-desc"
            value="DESC"
            checked={ order === 'DESC' }
            onChange={ handleOrderChange }
          />
          DESC
        </label>
        <button
          type="submit"
          data-testid="column-sort-button"
        >
          ORDENAR

        </button>
      </form>
    </div>
  );
}

export default SortColumns;
