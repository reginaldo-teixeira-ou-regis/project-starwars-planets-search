import PropTypes from 'prop-types';

function PlanetFilter({ nameFilter: {
  nameFilter,
  setNameFilter,
  column,
  setColumn,
  operator,
  setOperator,
  value,
  setValue,
  setButton } }) {
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Filtrar planetas"
        value={ nameFilter }
        onChange={ (e) => setNameFilter(e.target.value) }
      />
      <br />
      <label htmlFor="column-filter">
        Coluna:
        <select
          id="column-filter"
          data-testid="column-filter"
          value={ column }
          onChange={ (e) => setColumn(e.target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Operador:
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ operator }
          onChange={ (e) => setOperator(e.target.value) }
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
          value={ value }
          onChange={ (e) => setValue(e.target.value) }
        />
      </label>
      <button
        data-testid="button-filter"
        onClick={ () => { setButton({ column, operator, value }); } }
      >
        FILTRAR
      </button>
    </div>
  );
}

PlanetFilter.propTypes = {
  nameFilter: PropTypes.shape().isRequired,
};

export default PlanetFilter;
