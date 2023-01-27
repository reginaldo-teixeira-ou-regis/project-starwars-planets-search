import { useContext, useEffect, useState } from 'react';
import { FilterContext } from '../context/FilterProvider';
import { TableContext } from '../context/TableProvider';

function PlanetFilter() {
  const { planetsFilter, setPlanetsFilter, columnFilter, setColumnFilter,
    operatorFilter, setOperatorFilter, valueFilter, setValueFilter,
    multipleFilters, setMultipleFilters, inputsFilter,
    setNewState } = useContext(FilterContext);
  const { dataPlanets } = useContext(TableContext);

  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    const filterUseEffect = () => {
      setColumnFilter(options[0]);
    };
    filterUseEffect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const removeFilterColumn = (value) => {
    const newOptions = options.filter((option) => option !== value);
    setOptions(newOptions);
  };

  const handleClick = () => {
    setMultipleFilters([...multipleFilters,
      `${columnFilter} ${operatorFilter} ${valueFilter}`]);
    inputsFilter();
    removeFilterColumn(columnFilter);
  };

  const removeAllFilters = () => {
    setMultipleFilters([]);
    setOptions(['population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water']);
    setNewState(dataPlanets.results);
  };

  const splited = (value) => value.split(' ');

  const removeFilter = (filter) => {
    const [column] = splited(filter);
    const multiFilters = multipleFilters.filter((state) => !state.includes(column));
    setMultipleFilters(multiFilters);
    setOptions([...options, column]);
    const newFilterState = dataPlanets.results.filter((infoData) => {
      let columnValue = true;
      multiFilters.forEach((element) => {
        const [columnFilt, operatorFilt,, valueFilt] = splited(element);
        if (operatorFilt === 'maior') {
          columnValue = +infoData[columnFilt] > +valueFilt;
          return;
        }
        if (operatorFilt === 'menor') {
          columnValue = +infoData[columnFilt] < +valueFilt;
          return;
        }
        if (operatorFilt === 'igual') {
          columnValue = +infoData[columnFilt] === +valueFilt;
          return;
        }
        columnValue = true;
      });
      return columnValue;
    });
    setNewState(newFilterState);
  };

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Filtrar planetas"
        value={ planetsFilter }
        onChange={ (e) => setPlanetsFilter(e.target.value) }
      />
      <br />
      <label htmlFor="column-filter">
        Coluna:
        <select
          id="column-filter"
          data-testid="column-filter"
          value={ columnFilter }
          onChange={ (e) => setColumnFilter(e.target.value) }
        >
          {options.map((option, index) => (
            <option key={ option + index } value={ option }>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Operador:
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ operatorFilter }
          onChange={ (e) => setOperatorFilter(e.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          type="number"
          id="value-filter"
          data-testid="value-filter"
          value={ valueFilter }
          onChange={ (e) => setValueFilter(e.target.value) }
        />
      </label>
      <button
        data-testid="button-filter"
        onClick={ handleClick }
      >
        FILTRAR
      </button>
      {multipleFilters.map((filter, index) => (
        <p key={ filter + index } data-testid="filter">
          {filter}
          <button
            type="button"
            id={ index }
            data-testid={ filter + index }
            onClick={ () => removeFilter(filter) }
          >
            x
          </button>
        </p>))}
      <button
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        REMOVER TODOS OS FILTROS
      </button>
    </div>
  );
}

export default PlanetFilter;
