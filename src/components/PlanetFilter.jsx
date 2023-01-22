import { useContext, useEffect, useState } from 'react';
import { FilterContext } from '../context/FilterProvider';

function PlanetFilter() {
  const { planetsFilter, setPlanetsFilter, columnFilter, setColumnFilter,
    operatorFilter, setOperatorFilter, valueFilter, setValueFilter,
    multipleFilters, setMultipleFilters, inputsFilter } = useContext(FilterContext);
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
    console.log(columnFilter);
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
          {/* <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option> */}
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
      {[...new Set(multipleFilters)].map((filter, index) => (
        <p key={ filter + index }>
          {filter}
          <button
            type="button"
            id={ index }
            onClick={ () => { } }
          >
            Excluir
          </button>
        </p>))}
    </div>
  );
}

export default PlanetFilter;
